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
    redis.set(`user-${session?.user?.id}`, JSON.stringify(updateUser));
    res.json(updateUser);
  } else if (req.method === 'GET') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    let start = Date.now();
    let cache = await redis.get(`user-${session?.user?.id}`);
    cache = JSON.parse(cache);
    if (cache) {
      console.log('Latency cache: ',Date.now() - start);
      return res.status(200).json(cache);
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
      console.log('Latency db: ', Date.now() - start);
      redis.set(`user-${session?.user?.id}`, JSON.stringify(user));
      return res.status(200).json(user);
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
