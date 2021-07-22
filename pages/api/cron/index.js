import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        // Update the hotspot data from helium
        const date = new Date();
        const spots = await prisma.spot.findMany({
          select: { id: true, address: true },
        });
        for (const spot of spots || []) {
          const result = await fetch(
            `https://api.helium.io/v1/hotspots/${
              spot.address
            }/rewards/sum?min_time=2021-07-01T00:00:00.000Z&max_time=${date.toISOString()}&bucket=week`
          );
          const response = await result.json();
          if (response.data && response.data[0]) {
            await prisma.spot.update({
              where: { id: spot.id },
              data: {
                total: parseFloat(response.data[0].total),
              },
            });
          }
        }
        const poolTotals = await prisma.spot.groupBy({
          by: ['poolId'],
          _sum: {
            total: true,
          },
        });
        for (const total of poolTotals) {
          if (total.poolId) {
            await prisma.pool.update({
              where: { id: total.poolId },
              data: {
                total: total._sum?.total,
              },
            });
          }
        }
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
