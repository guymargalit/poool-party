import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
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

    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(req?.query?.id) || -1,
      },
      select: {
        id: true,
        venmoId: true,
      },
    });

    if (!expense) {
      return res.status(404).end();
    }

    if (user?.venmo?.id !== expense?.venmoId) {
      return res.status(403).end();
    }

    const receipt = await prisma.receipt.findFirst({
      where: {
        expenseId: expense?.id,
      },
    });

    await prisma.receipt.delete({
      where: {
        id: receipt?.id,
      },
    });

    await prisma.expense.delete({
      where: {
        id: Number(req?.query?.id) || -1,
      },
    });

    return res.status(200).send();
  }
}
