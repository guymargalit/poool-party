import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

//var apn = require('apn');

export default async function handler(req, res) {
console.log("PASSKIT: ", req, req.body)

res.status(200).end();
}
