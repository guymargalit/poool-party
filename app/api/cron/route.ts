import { sendVenmoRequest } from "@/lib/actions/venmo";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/utils";
import { Interval, Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const pools = await prisma.pool.findMany({
      where: {
        active: true,
        startDate: {
          lte: new Date(),
        },
        OR: [
          {
            lastSent: null,
          },
          {
            interval: Interval.DAY,
            lastSent: {
              lte: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
          },
          {
            interval: Interval.WEEK,
            lastSent: {
              lte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
          },
          {
            interval: Interval.MONTH,
            lastSent: {
              lte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
        ],
      },
      select: {
        id: true,
        note: true,
        venmo: {
          select: {
            id: true,
            accessToken: true,
          },
        },
        users: {
          select: {
            amount: true,
            venmoId: true,
          },
        },
      },
    });

    console.log(pools);

    for (const pool of pools) {
      if (!pool.venmo?.accessToken) continue;
      for (const poolUser of pool.users) {
        // Create venmo transactions
        try {
          const pid = await sendVenmoRequest({
            venmoId: poolUser.venmoId,
            accessToken: pool.venmo.accessToken,
            amount: poolUser.amount,
            note: pool.note,
          });

          await prisma.transaction.create({
            data: {
              amount: poolUser.amount,
              payerId: poolUser.venmoId,
              payeeId: pool.venmo.id,
              status: pid ? Status.PENDING : Status.FAILED,
              poolId: pool.id,
              pid,
            },
          });

          await prisma.poolUser.update({
            where: {
              poolId_venmoId: {
                poolId: pool.id,
                venmoId: poolUser.venmoId,
              },
            },
            data: {
              lastSent: new Date(),
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
      await prisma.pool.update({
        where: {
          id: pool.id,
        },
        data: {
          lastSent: new Date(),
        },
      });
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
