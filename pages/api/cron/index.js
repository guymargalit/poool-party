import prisma from '../../../lib/prisma';
import moment from 'moment';
import { getToken } from '../../../lib/utils';
import redis from '../../../lib/redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const expenses = await prisma.expense.findMany({
          select: {
            id: true,
            name: true,
            venmoId: true,
            active: true,
            draft: true,
            interval: true,
            startDate: true,
            lastRequest: true,
          },
          where: {
            active: true,
            draft: false,
            OR: [
              {
                interval: 'day',
                lastRequest: {
                  lte: moment().subtract(1, 'days').toDate(),
                },
              },
              {
                interval: 'week',
                lastRequest: {
                  lte: moment().subtract(7, 'days').toDate(),
                },
              },
              {
                interval: 'month',
                lastRequest: {
                  lte: moment().subtract(1, 'months').toDate(),
                },
              },
              {
                interval: {
                  not: null,
                },
                startDate: {
                  lte: new Date(),
                },
                lastRequest: null,
              },
            ],
          },
        });

        for (const expense of expenses) {
          const expenseUsers = await prisma.expenseUser.findMany({
            where: { expenseId: expense?.id },
            select: {
              id: true,
              expenseId: true,
              amount: true,
              venmoId: true,
            },
          });

          const creator = await prisma.venmo.findUnique({
            where: { id: expense?.venmoId },
          });

          for (const expenseUser of expenseUsers) {
            // Don't create venmo request for expense creator
            let paymentId, status;
            if (expenseUser?.venmoId !== creator?.id) {
              // Start venmo request
              const result = await fetch('https://api.venmo.com/v1/payments', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${getToken(creator?.accessToken)}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  note: expense?.name,
                  amount: `-${parseFloat(expenseUser?.amount)}`,
                  user_id: expenseUser?.venmoId,
                }),
              });
              const response = await result.json();
              if (response?.error) {
                await prisma.venmo.update({
                  data: { expiredAt: new Date() },
                  where: { id: creator?.id },
                });
                redis.del(`user-${creator?.userId}`);
              }
              status = response?.data?.payment?.status || 'failed';
              paymentId = response?.data?.payment?.id;
            }

            await prisma.request.create({
              data: {
                amount: parseFloat(expenseUser?.amount),
                expenseUser: { connect: { id: expenseUser?.id } },
                name: expense?.name,
                status: status || 'succeeded',
                paymentId: paymentId || null,
              },
            });
          }

          await prisma.expense.update({
            where: { id: expense?.id },
            data: {
              lastRequest: new Date(),
            },
          });
        }

        return res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
