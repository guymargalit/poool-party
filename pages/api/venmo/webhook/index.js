import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { venmo_challenge } = req?.query;

    if (venmo_challenge) {
      return res.send(venmo_challenge);
    }
    res.status(200).end();
  } else if (req.method === 'POST') {
    const { type, data } = req.body;

    console.log(type, data, req.body);

    const paymentId = data?.id;
    let status = data?.status;
    if (status === 'settled') {
      status = 'succeeded';
    }
    if (paymentId && status) {
      await prisma.request.update({
        where: { paymentId: paymentId },
        data: {
          status: status,
        },
      });
    }

    res.status(200).end();
  }
}
