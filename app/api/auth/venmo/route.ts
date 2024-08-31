import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/utils";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return new Response("Forbidden", { status: 403 });
  }

  const { username, password, deviceId, otp } = await req.json();

  if (!username) {
    return new Response("Username/phone/email required", { status: 400 });
  }

  if (!password) {
    return new Response("Password required", { status: 400 });
  }

  if (!deviceId) {
    return new Response("Device id required", { status: 400 });
  }

  const body = {
    phone_email_or_username: username,
    password: password,
    client_id: "1",
  };

  const headers: {
    "device-id": any;
    "Content-Type": string;
    "Venmo-Otp"?: string;
  } = {
    "device-id": deviceId,
    "Content-Type": "application/json",
  };

  if (otp) {
    headers["Venmo-Otp"] = otp;
  }

  const result = await fetch("https://api.venmo.com/v1/oauth/access_token", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  // 2FA
  const otpSecret = result.headers.get("venmo-otp-secret");
  if (otpSecret) {
    const body = { via: "sms" };
    await fetch("https://api.venmo.com/v1/account/two-factor/token", {
      method: "POST",
      headers: {
        "venmo-otp-secret": otpSecret,
        "device-id": deviceId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  const response = await result.json();

  if (response.user) {
    await prisma.venmo.upsert({
      where: {
        id: response.user.id,
      },
      update: {
        userId: session?.user?.id,
        username: response.user?.username,
        displayName: response.user?.display_name,
        image: response.user?.profile_picture_url,
        accessToken: await encrypt(response.access_token),
        expiredAt: null,
      },
      create: {
        id: response.user.id,
        userId: session?.user?.id,
        username: response.user?.username,
        displayName: response.user?.display_name,
        image: response.user?.profile_picture_url,
        accessToken: await encrypt(response.access_token),
        expiredAt: null,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response(JSON.stringify(response), { status: 200 });
}
