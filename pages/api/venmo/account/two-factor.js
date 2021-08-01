import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).end();
  }

  const { deviceId, otpSecret } = req.body;

  if (!deviceId) {
    return res.status(400).send('Device id required');
  }

  if (!otpSecret) {
    return res.status(400).send('Venmo OTP Secret required');
  }

  const body = { via: 'sms' };

  const result = await fetch(
    'https://api.venmo.com/v1/account/two-factor/token',
    {
      method: 'POST',
      headers: {
        'venmo-otp-secret': otpSecret,
        'device-id': deviceId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  const response = await result.json();
  res.json(response);
}
