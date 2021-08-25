import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import redis from '../../../lib/redis';
import { getToken, pick } from '../../../lib/utils';
const Pusher = require('pusher');

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
    const requests = await prisma.request.findMany({
      where: {
        // status: 'pending',
        expenseUser: {
          is: {
            venmoId: user?.venmo?.id,
          },
        },
      },
    });

    // for (const request of requests || []) {
    //   try {
    //     const result = await fetch(
    //       `https://api.venmo.com/v1/payments/${request?.paymentId}`,
    //       {
    //         method: 'GET',
    //         headers: {
    //           Authorization: `Bearer ${getToken(user?.venmo?.accessToken)}`,
    //           'Content-Type': 'application/json',
    //         },
    //       }
    //     );
    //     const response = await result.json();

    //     if (response?.data?.status) {
    //       let status = response?.data?.status;
    //       if (status === 'settled') {
    //         status = 'succeeded';
    //       }
    //       await prisma.request.update({
    //         where: { id: request?.id },
    //         data: {
    //           status: status,
    //         },
    //       });
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    return res.json(requests);
  }
}
