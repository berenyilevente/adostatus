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
    async jwt({ token, user, trigger }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }

      if (trigger === 'update' || !token.role) {
        const dbUser = await client.user.findUnique({
          where: { email: token.email! },
          select: { id: true, role: true },
        });
        if (dbUser) {
          token.userId = dbUser.id;
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
