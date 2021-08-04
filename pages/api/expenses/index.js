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
      venmo: { select: { id: true, accessToken: true } },
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

  const expenseCreator = await prisma.poolUser.findUnique({
    where: {
      venmopoolId: {
        venmoId: user?.venmo?.id,
        poolId: pool?.id,
      },
    },
    select: {
      id: true,
      venmoId: true,
      poolId: true,
    },
  });

  const expense = await prisma.expense.create({
    data: {
      name: name,
      creator: { connect: { id: expenseCreator?.id } },
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
          venmoId: true,
          poolId: true,
        },
      });

      if (poolUser) {
        const expenseUser = await prisma.expenseUser.create({
          data: {
            amount: parseFloat(u?.amount),
            expense: { connect: { id: expense?.id } },
            user: { connect: { id: parseInt(u?.id) } },
          },
        });

        // Don't create expense if not start date
        if (expense?.startDate && expense?.startDate <= new Date()) {
          // Don't create venmo request for expense creator
          let paymentId, status;
          if (poolUser?.id !== expense?.creatorId) {
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
            status = response?.data?.payment?.status || 'failed';
            paymentId = response?.data?.payment?.id;
          }

          await prisma.request.create({
            data: {
              amount: parseFloat(u?.amount),
              expenseUser: { connect: { id: expenseUser?.id } },
              name: name,
              status: status || 'succeeded',
              paymentId: paymentId,
            },
          });
        }
      }
    }
  }
  res.status(200).end();
}
