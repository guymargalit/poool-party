import { getSession } from 'next-auth/react';
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
        venmoId: true,
      },
    });

    if (user?.venmo?.id !== expense?.venmoId) {
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
        total: parseFloat(Math.abs(total)),
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
        let expenseUser;
        if (expense?.poolId) {
          const poolUser = await prisma.poolUser.findUnique({
            where: { id: parseInt(u?.id) },
            select: {
              id: true,
              venmoId: true,
              poolId: true,
            },
          });

          if (poolUser) {
            expenseUser = await prisma.expenseUser.create({
              data: {
                amount: parseFloat(Math.abs(u?.amount)),
                expense: { connect: { id: expense?.id } },
                venmo: { connect: { id: u?.venmo?.id } },
              },
            });
          }
        } else {
          const venmoUser = await prisma.venmo.upsert({
            where: { id: u?.venmo?.id },
            update: {},
            create: {
              id: u?.venmo?.id,
              username: u?.venmo?.username,
              displayName: u?.venmo?.displayName,
              image: u?.venmo?.image,
            },
          });

          if (venmoUser) {
            expenseUser = await prisma.expenseUser.create({
              data: {
                amount: parseFloat(Math.abs(u?.amount)),
                expense: { connect: { id: expense?.id } },
                venmo: { connect: { id: venmoUser?.id } },
              },
            });
          }
        }

        if (expenseUser) {
          // Don't create expense if not start date
          if (expense?.startDate && expense?.startDate <= new Date()) {
            // Don't create venmo request for expense creator
            let paymentId, status;
            if (
              expenseUser?.venmoId !== expense?.venmoId &&
              parseFloat(Math.abs(u?.amount)) > 0
            ) {
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
                  user_id: expenseUser?.venmoId,
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

    if (expense?.poolId) {
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
    } else {
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          draftId: null,
        },
      });
    }

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
        venmo: {
          select: {
            id: true,
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
        draft: true,
        startDate: true,
        venmo: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
        users: {
          select: {
            id: true,
            amount: true,
            venmo: {
              select: {
                id: true,
                username: true,
                displayName: true,
                image: true,
              },
            },
            requests: {
              orderBy: [
                {
                  updatedAt: 'desc',
                },
              ],
              select: {
                id: true,
                name: true,
                status: true,
                updatedAt: true,
                amount: true,
              },
            },
          },
        },
      },
    });
    const receipt = await prisma.receipt.findFirst({
      where: {
        expenseId: expense?.id,
      },
    });

    // If not a draft, check expense user
    if (!expense.draft) {
      const currentExpenseUser = await prisma.expenseUser.findFirst({
        where: {
          venmoId: user?.venmo?.id,
          expenseId: Number(req?.query?.id),
        },
        select: {
          venmoId: true,
          expenseId: true,
        },
      });

      if (!currentExpenseUser) {
        return res.status(404).end();
      }
    }

    return res.json(Object.assign({}, expense, { receipt }));
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
        venmo: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!expense) {
      return res.status(404).end();
    }

    if (req.body.active !== undefined) {
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

      if (user?.venmo?.id !== expense?.venmo?.id) {
        return res.status(403).end();
      }
    }

    const data = pick(req.body, [
      'name',
      'total',
      'startDate',
      'metadata',
      'interval',
      'image',
      'users',
      'locked',
    ]);

    const updateExpense = await prisma.expense.update({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      data: {
        ...(req?.body?.active !== undefined && { active: req.body.active }),
        metadata: { ...expense.metadata, ...data },
      },
    });

    channels.trigger(
      `expense-${expense?.id}`,
      req.body.lockedUser ? 'locked' : 'update',
      updateExpense,
      () => {
        res.json(updateExpense);
      }
    );
    const receipt = await prisma.receipt.findFirst({
      where: {
        expenseId: expense?.id,
      },
    });
    return res.json(Object.assign({}, updateExpense, { receipt }));
  } else if (req.method === 'DELETE') {
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
    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      select: {
        id: true,
        venmoId: true,
      },
    });

    if (!expense) {
      return res.status(404).end();
    }

    if (user?.venmo?.id !== expense?.venmoId) {
      return res.status(403).end();
    }

    const receipt = await prisma.receipt.findFirst({
      where: {
        expenseId: expense?.id,
      },
    });

    await prisma.receipt.delete({
      where: {
        id: receipt?.id,
      },
    });

    await prisma.expense.delete({
      where: {
        id: Number(req?.query?.id) || -1,
      },
    });

    return res.status(200).end();
  }
}
