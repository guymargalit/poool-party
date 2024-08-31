import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const runtime = "edge";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Pool ID is required" }, { status: 400 });
  }
  const body = await req.json();
  const { active } = body;

  await prisma.pool.update({
    where: { id },
    data: {
      active,
    },
  });
  return NextResponse.json({ message: "Pool updated" }, { status: 200 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Pool ID is required" }, { status: 400 });
  }

  const pool = await prisma.pool.findUnique({
    where: { id },
    select: {
      venmo: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!pool) {
    return NextResponse.json({ error: "Pool not found" }, { status: 404 });
  }

  if (pool.venmo.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.pool.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Pool deleted" }, { status: 200 });
}
