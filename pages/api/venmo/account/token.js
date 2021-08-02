import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';

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
    await prisma.venmo.upsert({
      where: { id: response?.user?.id },
      update: {
        userId: session?.user?.id,
        username: response?.user?.username,
        displayName: response?.user?.display_name,
        email: response?.user?.email,
        phone: response?.user?.phone,
        image: response?.user?.profile_picture_url,
        accessToken: response?.access_token,
        expiredAt: null,
      },
      create: {
        id: response?.user?.id,
        userId: session?.user?.id,
        username: response?.user?.username,
        displayName: response?.user?.display_name,
        email: response?.user?.email,
        phone: response?.user?.phone,
        image: response?.user?.profile_picture_url,
        accessToken: response?.access_token,
        expiredAt: null,
      },
    });
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: {
        id: true,
        name: true,
        toy: true,
        venmo: {
          select: {
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
