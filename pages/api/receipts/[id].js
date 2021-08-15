import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const receipt = await prisma.receipt.findUnique({
      where: {
        id: req.query.id,
      },
      select: {
        expense: true,
      },
    });
    res.json(receipt);
  }
}
