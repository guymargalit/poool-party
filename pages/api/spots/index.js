import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { address } = req.body;

    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    // Check if valid address on Helium network
    const result = await fetch(`https://api.helium.io/v1/hotspots/${address}`);
    if (result.status !== 200) {
      return res.status(result.status).end();
    }

    const response = await result.json();
    const spot = await prisma.spot.create({
      data: {
        address: address,
        name: response?.data?.name,
        user: { connect: { id: session?.user?.id } },
      },
    });
    res.json(spot);
  } else if (req.method === 'GET') {
    const result = await prisma.spot.findMany({
      select: { name: true },
    });
    res.json(result);
  } else {
    // Handle any other HTTP method
  }
}
