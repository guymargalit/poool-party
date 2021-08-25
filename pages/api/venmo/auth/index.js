export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Code required');
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  const body = {
    client_id: process.env.VENMO_CLIENT_ID,
    client_secret: '',
    code: code,
  };

  const result = await fetch('https://api.venmo.com/v1/oauth/access_token', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  const response = await result.json();
  res.json(response);
}
