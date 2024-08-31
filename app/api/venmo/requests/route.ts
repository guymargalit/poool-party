import { auth } from "@/auth";
import { sendVenmoRequest } from "@/lib/actions/venmo";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/utils";
import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  const venmo = await prisma.venmo.findUnique({
    select: {
      accessToken: true,
      id: true,
    },
    where: { userId: session.user.id },
  });

  if (!venmo?.accessToken) {
    return NextResponse.json(
      { error: "Must have Venmo connected" },
      { status: 400 }
    );
  }

  const result = await fetch(
    `https://api.venmo.com/v1/requests?status=outgoing`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await decrypt(venmo.accessToken)}`,
        "Content-Type": "application/json",
      },
    }
  );

  const response = await result.json();

  if (response?.error) {
    await prisma.venmo.update({
      data: { expiredAt: new Date() },
      where: { userId: session.user.id },
    });
  }

  return NextResponse.json(response.data, { status: 200 });
}

// Create a request
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const venmo = await prisma.venmo.findUnique({
    select: {
      accessToken: true,
      id: true,
    },
    where: { userId: session.user.id },
  });

  if (!venmo?.accessToken) {
    return NextResponse.json(
      { error: "Must have Venmo connected" },
      { status: 400 }
    );
  }

  const { poolId, poolUser } = body;

  const pool = await prisma.pool.findUnique({
    where: { id: poolId },
    select: {
      note: true,
    },
  });

  if (!pool) {
    return NextResponse.json({ error: "Pool not found" }, { status: 404 });
  }

  // Create venmo transactions
  try {
    const pid = await sendVenmoRequest({
      venmoId: poolUser.venmoId,
      accessToken: venmo.accessToken,
      amount: poolUser.amount,
      note: pool.note,
    });

    await prisma.transaction.create({
      data: {
        amount: poolUser.amount,
        payerId: poolUser.venmoId,
        payeeId: venmo.id,
        status: pid ? Status.PENDING : Status.FAILED,
        poolId,
        pid,
      },
    });

    await prisma.poolUser.update({
      where: {
        poolId_venmoId: {
          poolId,
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

  await prisma.pool.update({
    where: {
      id: poolId,
    },
    data: {
      lastSent: new Date(),
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
