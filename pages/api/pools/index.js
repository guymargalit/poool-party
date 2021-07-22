import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;

    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    const response = await result.json();
    const spot = await prisma.pool.create({
      data: {
        name: name,
        creator: { connect: { id: session?.user?.id } },
      },
    });
    res.json(spot);
  } else if (req.method === 'GET') {
    const result = await prisma.pool.findMany({
      select: { name: true },
    });
    res.json(result);
  } else {
    // Handle any other HTTP method
  }
}
