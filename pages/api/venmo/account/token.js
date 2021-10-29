import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';
import redis from '../../../../lib/redis';
var CryptoJS = require('crypto-js');

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).end();
  }

  const { username, password, deviceId, otp } = req.body;

  if (!username) {
    return res.status(400).send('Username/phone/email required');
  }

  if (!password) {
    return res.status(400).send('Password required');
  }

  if (!deviceId) {
    return res.status(400).send('Device id required');
  }

  const body = {
    phone_email_or_username: username,
    password: password,
    client_id: '1',
  };

  const headers = {
    'device-id': deviceId,
    'Content-Type': 'application/json',
  };

  if (otp) {
    headers['Venmo-Otp'] = otp;
  }

  const result = await fetch('https://api.venmo.com/v1/oauth/access_token', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  // 2FA
  if (result.headers.get('venmo-otp-secret')) {
    const body = { via: 'sms' };
    await fetch('https://api.venmo.com/v1/account/two-factor/token', {
      method: 'POST',
      headers: {
        'venmo-otp-secret': result.headers.get('venmo-otp-secret'),
        'device-id': deviceId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
  const response = await result.json();
  if (response?.user) {
    const accessToken = CryptoJS.AES.encrypt(
      response?.access_token,
      process.env.TOKEN_SECRET_KEY
    ).toString();
    await prisma.venmo.upsert({
      where: { id: response?.user?.id },
      update: {
        userId: session?.user?.id,
        username: response?.user?.username,
        displayName: response?.user?.display_name,
        image: response?.user?.profile_picture_url,
        accessToken: accessToken,
        expiredAt: null,
      },
      create: {
        id: response?.user?.id,
        userId: session?.user?.id,
        username: response?.user?.username,
        displayName: response?.user?.display_name,
        image: response?.user?.profile_picture_url,
        accessToken: accessToken,
        expiredAt: null,
      },
    });
    if (redis) {
      redis.del(`user-${session?.user?.id}`);
    }
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: {
        id: true,
        name: true,
        toy: true,
        venmo: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
            expiredAt: true,
          },
        },
      },
    });
    return res.json({ user: user });
  }
  res.json(response);
}
