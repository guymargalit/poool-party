// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { html, text } from '@/lib/mailer';
import EmailProvider from 'next-auth/providers/email';

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  adapter: PrismaAdapter(prisma),
  // pages: {
  //   signIn: '/',
  //   error: '/', // Error code passed in query string as ?error=
  // },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [
    EmailProvider({
      id: 'email',
      type: 'email',
      maxAge: 5 * 60,
      async generateVerificationToken() {
        return `${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
      },
      async sendVerificationRequest({ identifier: email, url, token }) {
        // Call the cloud Email provider API for sending emails
        // See https://docs.sendgrid.com/api-reference/mail-send/mail-send
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          // The body format will vary depending on provider, please see their documentation
          // for further details.
          body: JSON.stringify({
            personalizations: [{ to: [{ email }] }],
            from: { email: 'help@poool.party', name: 'Poool Party' },
            subject: `Your temporary Poool Party login code is ${token}`,
            content: [
              {
                type: 'text/plain',
                value: text({ url, host: 'Poool Party', token }),
              },
              {
                type: 'text/html',
                value: html({ url, host: 'Poool Party', email, token }),
              },
            ],
          }),
          headers: {
            // Authentication will also vary from provider to provider, please see their docs.
            Authorization: `Bearer ${process.env.sendgridApi}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        if (!response.ok) {
          const { errors } = await response.json();
          throw new Error(JSON.stringify(errors));
        }
      },
    }),
  ],
};
