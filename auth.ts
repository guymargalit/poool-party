import { sendVerificationRequest } from "@/utils/send-verification-request";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session
    },
  },
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
