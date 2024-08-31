"use server";

import { Status } from "@prisma/client";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/utils";

export async function sendVenmoRequest({
  amount,
  note,
  venmoId,
  accessToken,
}: {
  amount: number;
  note: string;
  venmoId: string;
  accessToken: string;
}) {
  try {
    const body = {
      note: `${note}`,
      amount: `-${Math.abs(amount / 100)}`,
      user_id: venmoId,
      audience: "private",
    };

    const result = await fetch("https://api.venmo.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await decrypt(accessToken)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await result.json();

    console.log(response);

    if (response?.error) {
      return null;
    }

    return response?.data?.payment?.id;
  } catch (error) {
    console.error(error);
    await expireVenmoAccessToken({ accessToken });
    return null;
  }
}

export async function getVenmoRequestStatus({
  pid,
  accessToken,
}: {
  pid: string;
  accessToken: string;
}) {
  try {
    const result = await fetch(`https://api.venmo.com/v1/payments/${pid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await decrypt(accessToken)}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();

    if (response?.data?.status) {
      let status = response?.data?.status;
      if (status === "settled") {
        status = Status.SUCCEEDED;
      } else if (status === "failed") {
        status = Status.FAILED;
      } else if (status === "pending") {
        status = Status.PENDING;
      } else if (status === "cancelled") {
        status = Status.CANCELLED;
      }
      return status;
    }
  } catch (error) {
    console.error(error);
    await expireVenmoAccessToken({ accessToken });
    return null;
  }
}

export async function expireVenmoAccessToken({
  accessToken,
}: {
  accessToken: string;
}) {
  await prisma.venmo.updateMany({
    where: {
      accessToken,
    },
    data: {
      expiredAt: new Date(),
    },
  });
}
