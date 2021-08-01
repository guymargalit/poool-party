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

  const { poolId, name, users, interval, date, total } = req.body;

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

  if (!name) {
    return res.status(400).send('Expense name required');
  }

  if (!total) {
    return res.status(400).send('Total required');
  }

  const expense = await prisma.expense.create({
    data: {
      name: name,
      creator: { connect: { id: session?.user?.id } },
      pool: { connect: { id: pool?.id } },
      active: true,
      total: parseFloat(total),
      interval: interval,
      intervalCount: interval ? 1 : null,
      startDate: date ? new Date(date) : new Date(),
    },
  });

  if (users) {
    for (const u of users) {
      const poolUser = await prisma.poolUser.findUnique({
        where: { id: parseInt(u?.id) },
        select: {
          id: true,
          userId: true,
          venmoId: true,
          poolId: true,
        },
      });

      if (poolUser) {
        await prisma.expenseUser.create({
          data: {
            amount: parseFloat(u?.amount),
            expense: { connect: { id: expense?.id } },
            user: { connect: { id: parseInt(u?.id) } },
          },
        });

        // Don't create venmo request for expense creator
        if (poolUser?.userId !== expense?.creatorId) {
          // Start venmo request
          const result = await fetch('https://api.venmo.com/v1/payments', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${user?.venmo?.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              note: name,
              amount: `-${parseFloat(u?.amount)}`,
              user_id: u?.venmoId,
              audience: 'private',
            }),
          });
          const response = await result.json();

          await prisma.request.create({
            data: {
              amount: parseFloat(u?.amount),
              expense: { connect: { id: expense?.id } },
              user: { connect: { id: poolUser?.id } },
              name: name,
              status: response?.data?.payment?.status || 'failed',
              paid: false,
              paymentId: response?.data?.payment?.id,
            },
          });
        }
      }
    }
  }
  res.status(200).end();
}
