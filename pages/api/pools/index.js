import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    const { name, users } = req.body;

    if (!name) {
      return res.status(400).send('Pool name required');
    }

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: {
        id: true,
        venmo: {
          select: { id: true },
        },
      },
    });
    const pool = await prisma.pool.create({
      data: {
        name: name,
        venmo: { connect: { id: user?.venmo?.id } },
      },
    });
    // Join creator to pool
    await prisma.poolUser.create({
      data: {
        pool: { connect: { id: pool?.id } },
        venmo: { connect: { id: user?.venmo?.id } },
      },
    });
    // Add users to pool
    if (users) {
      for (const u of users) {
        const venmoUser = await prisma.venmo.upsert({
          where: { id: u?.id },
          update: {},
          create: {
            id: u?.id,
            username: u?.username,
            displayName: u?.display_name,
            image: u?.profile_picture_url,
          },
        });
        await prisma.poolUser.create({
          data: {
            pool: { connect: { id: pool?.id } },
            venmo: { connect: { id: venmoUser?.id } },
          },
        });
      }
    }

    res.json(pool);
  } else if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    const result = await prisma.pool.findMany({
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
      where: {
        users: {
          some: {
            venmo: {
              userId: session?.user?.id,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
        users: {
          select: {
            venmo: { select: { userId: true, image: true, username: true } },
          },
        },
      },
    });
    res.json(result);
  } else {
    // Handle any other HTTP method
  }
}
