import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

//var apn = require('apn');

export default async function handler(req, res) {
  console.log('PASSKIT INDEX: ', req.params, req.body);

  await prisma.user.update({
    where: { id: 1 },
    data: {
      settings: JSON.stringify(Object.assign({}, req.params, req.body)),
    },
  });

  res.status(200).send();
}
