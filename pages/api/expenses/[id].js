import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import redis from '../../../lib/redis';
import { getToken, pick } from '../../../lib/utils';
const Pusher = require('pusher');

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

    let expense = await prisma.expense.findUnique({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      select: {
        id: true,
        poolId: true,
        creator: { select: { id: true, venmoId: true } },
      },
    });

    if (user?.venmo?.id !== expense?.creator?.venmoId) {
      return res.status(403).end();
    }

    const { name, users, interval, date, total, image } = req.body;

    if (!name) {
      return res.status(400).send('Expense name required');
    }

    if (!total) {
      return res.status(400).send('Total required');
    }

    expense = await prisma.expense.update({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      data: {
        name: name,
        active: true,
        draft: false,
        total: parseFloat(total),
        interval: interval,
        intervalCount: interval ? 1 : null,
        startDate: date ? new Date(date) : new Date(),
        image: image,
      },
    });

    if (!expense.total) {
      return res.status(400).send('Expense not found');
    }

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
              amount: parseFloat(Math.abs(u?.amount)),
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
                  Authorization: `Bearer ${getToken(user?.venmo?.accessToken)}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  note: name,
                  amount: `-${parseFloat(Math.abs(u?.amount))}`,
                  user_id: u?.venmoId,
                  audience: 'private',
                }),
              });
              const response = await result.json();

              if (response?.error) {
                await prisma.venmo.update({
                  data: { expiredAt: new Date() },
                  where: { id: user?.venmo?.id },
                });
                redis.del(`user-${user?.id}`);
              }

              status = response?.data?.payment?.status || 'failed';
              paymentId = response?.data?.payment?.id;
            }

            await prisma.request.create({
              data: {
                amount: parseFloat(Math.abs(u?.amount)),
                expenseUser: { connect: { id: expenseUser?.id } },
                name: name,
                status: status || 'succeeded',
                paymentId: paymentId,
              },
            });
            await prisma.expense.update({
              where: { id: expense?.id },
              data: {
                lastRequest: new Date(),
              },
            });
          }
        }
      }
    }

    await prisma.poolUser.update({
      where: {
        venmopoolId: {
          venmoId: user?.venmo?.id,
          poolId: expense?.poolId,
        },
      },
      data: {
        draftId: null,
      },
    });

    return res.status(200).end();
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
      return res.status(403).end();
    }

    // Update status of requests
    const expenseUsers = await prisma.expenseUser.findMany({
      select: {
        id: true,
        user: {
          select: {
            venmoId: true,
          },
        },
        requests: {
          select: { id: true, status: true, paymentId: true },
          where: {
            status: 'pending',
          },
        },
      },
      where: {
        expenseId: Number(req?.query?.id) || -1,
      },
    });

    for (const expenseUser of expenseUsers) {
      for (const request of expenseUser?.requests || []) {
        try {
          const result = await fetch(
            `https://api.venmo.com/v1/payments/${request?.paymentId}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${getToken(user?.venmo?.accessToken)}`,
                'Content-Type': 'application/json',
              },
            }
          );
          const response = await result.json();

          if (response?.data?.status) {
            let status = response?.data?.status;
            if (status === 'settled') {
              status = 'succeeded';
            }
            await prisma.request.update({
              where: { id: request?.id },
              data: {
                status: status,
              },
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      select: {
        id: true,
        name: true,
        total: true,
        active: true,
        interval: true,
        metadata: true,
        users: {
          select: {
            id: true,
            amount: true,
            user: {
              select: {
                venmo: {
                  select: {
                    id: true,
                    username: true,
                    displayName: true,
                    image: true,
                  },
                },
              },
            },
            requests: {
              select: {
                id: true,
                name: true,
                status: true,
                createdAt: true,
                amount: true,
              },
            },
          },
        },
      },
    });
    return res.json(expense);
  } else if (req.method === 'PUT') {
    const channels = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
    });

    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      select: {
        id: true,
        metadata: true,
      },
    });

    if (!expense) {
      return res.status(404).end();
    }

    const data = pick(req.body, [
      'name',
      'total',
      'startDate',
      'metadata',
      'interval',
      'active',
      'image',
      'users',
      'locked',
    ]);

    const updateExpense = await prisma.expense.update({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      data: { metadata: { ...expense.metadata, ...data } },
    });

    channels.trigger(
      `expense-${expense?.id}`,
      req.body.lockedUser ? 'locked' : 'update',
      updateExpense,
      () => {
        res.json(updateExpense);
      }
    );
    return res.json(updateExpense);
  }
}
