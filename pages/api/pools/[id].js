import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

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

  const pool = await prisma.pool.findUnique({
    where: {
      id: Number(req?.query?.id) || -1,
    },
    select: {
      id: true,
      name: true,
      users: {
        select: {
          id: true,
          venmo: {
            select: {
              id: true,
              username: true,
              displayName: true,
              image: true,
              user: { select: { toy: true } },
            },
          },
        },
      },
      expenses: {
        select: {
          id: true,
          name: true,
          active: true,
          createdAt: true,
          interval: true,
          total: true,
        },
      },
    },
  });
  res.json(pool);
}
