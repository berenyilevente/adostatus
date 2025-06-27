import { NextAuthOptions } from 'next-auth';
import client from '@/lib/prisma/client';

import { emailProvider } from './auth-providers';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  session: {
    strategy: 'jwt',
  },
  providers: [emailProvider],
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add userId to the token when user signs in
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add userId to the session
      if (token.userId && session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};
