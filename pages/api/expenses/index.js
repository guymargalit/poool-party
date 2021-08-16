import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import redis from '../../../lib/redis';
import { getToken } from '../../../lib/utils';

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
        venmo: { select: { id: true, accessToken: true } },
      },
    });

    if (!user?.venmo?.accessToken) {
      return res.status(403).end();
    }

    const { poolId } = req.body;

    if (!poolId) {
      return res.status(400).send('Pool id is required');
    }

    const pool = await prisma.pool.findUnique({
      where: { id: parseInt(poolId) },
      select: {
        id: true,
      },
    });

    if (!pool) {
      return res.status(400).send('Pool invalid');
    }

    const expense = await prisma.expense.create({
      data: {
        creator: {
          connect: {
            venmopoolId: {
              venmoId: user?.venmo?.id,
              poolId: pool?.id,
            },
          },
        },
        pool: { connect: { id: pool?.id } },
        active: false,
        draft: true,
      },
    });

    await prisma.receipt.create({
      data: {
        expense: { connect: { id: expense?.id } },
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

    res.json(expense);
  }
}
