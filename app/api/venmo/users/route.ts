import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/utils";
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

  try {
    const result = await fetch(
      `https://api.venmo.com/v1/users?query=${query}&type=username`,
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
  } catch (error) {
    console.error(error);
    await prisma.venmo.update({
      data: { expiredAt: new Date() },
      where: { userId: session.user.id },
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
