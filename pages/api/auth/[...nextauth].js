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
      return session;
    },
    async redirect(url, baseUrl) {
      return Promise.resolve(url)
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
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // {
    //   id: "venmo",
    //   name: "Venmo",
    //   type: "oauth",
    //   version: "2.0",
    //   scope: "make_payments access_profile access_email access_phone access_friends",
    //   params: { grant_type: "authorization_code" },
    //   accessTokenUrl: "https://api.venmo.com/v1/oauth/access_token",
    //   authorizationUrl: `https://api.venmo.com/v1/oauth/authorize?client_id=${process.env.VENMO_CLIENT_ID}&response_type=code`,
    //   profileUrl:'https://api.venmo.com/v1/me',
    //   async profile(response, tokens) {
    //     console.log(response, tokens)
    //     const user = response?.data?.user;
    //     // You can use the tokens, in case you want to fetch more profile information
    //     // For example several OAuth providers do not return email by default.
    //     // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
    //     return {
    //       id: user?.id,
    //       name: user?.display_name,
    //       email: user?.email,
    //       image: user?.profile_picture_url,
    //     }
    //   },
    //   clientId: process.env.VENMO_CLIENT_ID,
    //   clientSecret: process.env.VENMO_CLIENT_SECRET
    // }
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};
