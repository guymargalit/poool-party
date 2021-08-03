import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

//var apn = require('apn');

export default async function handler(req, res) {
  const { device } = req.query
  console.log('PASSKIT: ', device);

  await prisma.user.update({
    where: { id: 1 },
    data: {
      settings: JSON.stringify(device),
    },
  });

  res.status(200).send();
}
