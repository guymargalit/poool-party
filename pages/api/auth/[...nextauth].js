// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma';

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  callbacks: {
    async jwt(token, user) {
      // Add user id to the token right after signin
      if (user?.id) {
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
    async session(session, token) {
      // Add property to session
      session.user.id = token.id;
      const user = await prisma.user.findUnique({
        where: { id: token?.id },
        select: {
          id: true,
          venmoVerified: true,
        },
      });
      session.user.venmoVerified = user?.venmoVerified;
      return session;
    },
  },
  providers: [
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};
