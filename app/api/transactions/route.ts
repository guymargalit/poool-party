import { auth } from "@/auth";
import { getVenmoRequestStatus } from "@/lib/actions/venmo";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/utils";
import { Status } from "@prisma/client";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const venmo = await prisma.venmo.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      accessToken: true,
    },
  });

  if (!venmo?.accessToken) {
    return NextResponse.json([], { status: 200 });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      payee: {
        userId: session.user.id,
      },
      ...(status ? { status: status as Status } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      amount: true,
      status: true,
      createdAt: true,
      pid: true,
      pool: {
        select: {
          note: true,
        },
      },
      payee: {
        select: {
          displayName: true,
        },
      },
      payer: {
        select: {
          displayName: true,
          image: true,
        },
      },
    },
  });

  for (const transaction of transactions) {
    if (!transaction.pid) continue;
    try {
      if (transaction.status === Status.PENDING) {
        const status = await getVenmoRequestStatus({
          pid: transaction.pid,
          accessToken: venmo.accessToken,
        });
        if (status !== Status.PENDING) {
          await prisma.transaction.update({
            where: {
              id: transaction.id,
            },
            data: {
              status,
            },
          });
        }
        transaction.status = status;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.json(transactions);
}
