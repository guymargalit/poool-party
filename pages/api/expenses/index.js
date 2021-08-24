import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: {
        id: true,
        venmo: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
            accessToken: true,
          },
        },
        draft: true,
      },
    });

    if (!user?.venmo?.accessToken) {
      return res.status(403).end();
    }

    const { poolId } = req.body;
    let expense;

    if (poolId) {
      const pool = await prisma.pool.findUnique({
        where: { id: parseInt(poolId) },
        select: {
          id: true,
        },
      });

      if (!pool) {
        return res.status(404).send('Pool not found');
      }

      expense = await prisma.expense.create({
        data: {
          venmo: {
            connect: {
              id: user?.venmo?.id,
            },
          },
          pool: { connect: { id: pool?.id } },
          active: false,
          draft: true,
        },
      });

      await prisma.poolUser.update({
        where: {
          venmopoolId: {
            venmoId: user?.venmo?.id,
            poolId: pool?.id,
          },
        },
        data: {
          draft: {
            connect: {
              id: expense?.id,
            },
          },
        },
      });
    } else {
      if(user?.draft) {
        const receipt = await prisma.receipt.findFirst({
          where: {
            expenseId: user?.draft?.id,
          },
        });
        return res.json(Object.assign({}, user?.draft, { receipt }));
      }
      expense = await prisma.expense.create({
        data: {
          venmo: {
            connect: {
              id: user?.venmo?.id,
            },
          },
          active: false,
          draft: true,
          metadata: {
            users: [
              {
                id: user?.venmo?.id,
                creator: true,
                venmo: {
                  id: user?.venmo?.id,
                  username: user?.venmo?.username,
                  displayName: user?.venmo?.displayName,
                  image: user?.venmo?.image,
                },
              },
            ],
          },
        },
      });

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          draft: {
            connect: {
              id: expense?.id,
            },
          },
        },
      });
    }

    const receipt = await prisma.receipt.create({
      data: {
        expense: { connect: { id: expense?.id } },
      },
    });

    res.json(Object.assign({}, expense, { receipt }));
  } else if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: {
        id: true,
        venmo: { select: { id: true, accessToken: true } },
      },
    });

    if (!user?.venmo?.accessToken) {
      return res.status(403).send([]);
    }

    const result = await prisma.expense.findMany({
      orderBy: [
        { active: 'desc' },
        {
          updatedAt: 'desc',
        },
      ],
      select: {
        id: true,
        name: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        interval: true,
        total: true,
        draft: true,
      },
      where: {
        draft: false,
        venmoId: user?.venmo?.id,
      },
    });
    res.json(result);
  }
}
