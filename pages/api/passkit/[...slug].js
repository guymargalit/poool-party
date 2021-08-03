import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

//var apn = require('apn');

export default async function handler(req, res) {
  const { slug } = req.query;
  console.log('PASSKIT: ', slug);
  await prisma.user.update({
    where: { id: 1 },
    data: {
      settings: JSON.stringify(Object.assign({}, req.body, slug)),
    },
  });

  if (slug) {
    if (slug[1] === 'devices') {
      const device = slug[2];
      const pass = slug[5];
      const pushToken = req?.body?.pushToken;
      console.log('DEVICE: ', device);
      console.log('PASS: ', pass);
      console.log('PUSH TOKEN: ', pushToken);
      res.status(200).send({ lastUpdated: new Date(), serialNumbers: ['8j23fm3'] });
    } else if (slug[1] === 'passes') {
      const pass = slug[3];
      console.log('PASS: ', pass)
      res.status(200).send({
        "formatVersion" : 1,
        "passTypeIdentifier" : "pass.party.poool",
        "serialNumber" : "8j23fm3",
        "webServiceURL" : "https://poool.party/api/passkit",
        "authenticationToken" : "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc",
        "teamIdentifier" : "HRE8F26WGL",
        "organizationName" : "Poool Party",
        "description" : "Poool Party",
        "logoText" : "Poool Party",
        "foregroundColor" : "rgb(255, 255, 255)",
        "backgroundColor" : "rgb(84, 192, 249)",
        "generic" : {
          "primaryFields" : [
            {
              "key" : "offer",
              "value" : "Poool Party!"
            }
          ]
        }
      });
    }
  }
}
