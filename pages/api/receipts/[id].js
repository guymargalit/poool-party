import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const receipt = await prisma.receipt.findFirst({
      where: {
        id: req.query.id,
        expense: {
          draft: true,
        }
      },
      select: {
        expense: true,
      },
    });

    if (!receipt) {
      return res.status(404).end();
    }
    return res.json(receipt);
  }
}
