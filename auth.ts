import { sendVerificationRequest } from "@/utils/send-verification-request";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { authConfig } from "./auth.config";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
      async generateVerificationToken() {
        return `${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
      },
    }),
  ],
});
