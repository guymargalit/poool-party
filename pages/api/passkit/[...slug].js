import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

//var apn = require('apn');

export default async function handler(req, res) {
  const { slug } = req.query
  console.log('PASSKIT: ', slug);

  await prisma.user.update({
    where: { id: 1 },
    data: {
      settings: JSON.stringify(Object.assign({}, req.body, slug)),
    },
  });

  res.status(200).send();
}
