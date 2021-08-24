import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import redis from '../../../lib/redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    const updateUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        toy: req.body.toy,
      },
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
    if (redis) {
      redis.set(`user-${session?.user?.id}`, JSON.stringify(updateUser));
    }
    res.json(updateUser);
  } else if (req.method === 'GET') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    let cache;
    if (redis) {
      cache = await redis.get(`user-${session?.user?.id}`);
      cache = JSON.parse(cache);
    }
    if (cache) {
      const draft = await prisma.expense.findFirst({
        where: { venmoId: cache?.venmo?.id, poolId: null, draft: true },
      });
      return res.status(200).json(Object.assign({}, cache, { draft }));
    } else {
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

      if (redis) {
        redis.set(`user-${session?.user?.id}`, JSON.stringify(user));
      }

      const draft = await prisma.expense.findFirst({
        where: { venmoId: user?.venmo?.id, poolId: null, draft: true },
      });
      return res.status(200).json(Object.assign({}, user, { draft }));
    }
  } else if (req.method === 'PUT') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    const updateUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        settings: req.body.settings,
      },
    });
    res.json(updateUser);
  } else {
    // Handle any other HTTP method
  }
}
