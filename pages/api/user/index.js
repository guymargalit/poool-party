import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    const updateUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        toy: req.body.toy,
      },
    });
    res.json(updateUser);
  } else if (req.method === 'GET') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: {
        id: true,
        name: true,
        toy: true,
        venmo: {
          select: { username: true, displayName: true, image: true, expiredAt: true}
        },
        venmoVerified: true
      },
    });
    res.json(user);
  } else if (req.method === 'PUT') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(403).end();
    }
    const updateUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        settings: req.body.settings,
      },
    });
    res.json(updateUser);
  } else {
    // Handle any other HTTP method
  }
}
