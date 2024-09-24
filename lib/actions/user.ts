"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function getUser() {
  const session = await auth();
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      email: true,
      venmo: {
        select: {
          id: true,
          accessToken: true,
          expiredAt: true,
        },
      },
    },
  });
  // Set access token as true if it exists
  if (user?.venmo?.accessToken) {
    user.venmo.accessToken = 'true';
  }
  return user;
}

export async function getVenmo() {
  const session = await auth();
  if (!session?.user) return null;
  const venmo = await prisma.venmo.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      accessToken: true,
    },
  });
  return venmo;
}
