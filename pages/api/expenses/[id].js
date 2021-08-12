import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import { getToken } from '../../../lib/utils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
          await prisma.request.update({
            where: { id: request?.id },
            data: {
              status: response?.data?.status,
            },
          });
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
    res.json(expense);
  } else if (req.method === 'PUT') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    const updateExpense = await prisma.expense.update({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      data: {
        active: req.body.active
      }
    })
    res.json(updateExpense);
  }
}
