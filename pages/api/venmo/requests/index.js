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

  const result = await fetch(
    `https://api.venmo.com/v1/requests?status=outgoing`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.venmo?.accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const response = await result.json();
  res.json(response);
}
