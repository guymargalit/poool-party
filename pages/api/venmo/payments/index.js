import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).end();
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      id: true,
      venmo: { select: { accessToken: true } },
    },
  });

  if (!user?.venmo?.accessToken) {
    return res.status(403).end();
  }

  const { note, amount, userId } = req.body;

  if (!note) {
    return res.status(400).send('Note invalid');
  }

  if (!amount) {
    return res.status(400).send('Amount invalid');
  }

  if (!userId) {
    return res.status(400).send('User invalid');
  }

  const body = {
    note: note,
    amount: `-${parseFloat(amount)}`,
    user_id: userId,
    audience: 'private',
  };

  const result = await fetch('https://api.venmo.com/v1/payments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user?.venmo?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  console.log(result)
  const response = await result.json();
  console.log(response)
  res.json(response);
}
