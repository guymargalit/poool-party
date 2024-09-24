import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pools = await prisma.pool.findMany({
    where: {
      venmo: {
        userId: session.user.id,
      },
    },
    select: {
      id: true,
      note: true,
      interval: true,
      active: true,
      users: {
        select: {
          amount: true,
          lastSent: true,
          venmo: {
            select: {
              id: true,
              image: true,
              displayName: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(pools, { status: 200 });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { note, users, interval, startDate } = body;

  const venmo = await prisma.venmo.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      accessToken: true,
    },
  });

  if (!venmo?.accessToken) {
    return NextResponse.json(
      { error: "Venmo access token not found" },
      { status: 400 }
    );
  }

  const pool = await prisma.pool.create({
    data: {
      note,
      venmo: {
        connect: {
          id: venmo.id,
        },
      },
      interval,
      startDate,
    },
  });

  // Create venmo users
  await prisma.venmo.createMany({
    data: users.map((user: any) => ({
      id: user.id,
      username: user.username,
      displayName: user.display_name,
      image: user.profile_picture_url,
    })),
    skipDuplicates: true,
  });

  // Create pool users
  await prisma.poolUser.createMany({
    data: users.map((user: any) => ({
      poolId: pool.id,
      amount: Math.round(parseFloat(user.amount) * 100),
      venmoId: user.id,
    })),
  });

  return NextResponse.json({ message: "Pool created" }, { status: 200 });
}
