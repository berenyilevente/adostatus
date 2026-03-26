'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth';
import { redirect } from 'next/navigation';
import prisma from '../prisma/client';
import { Role, User } from '@/generated/prisma';

type AuthResult = {
  session: Awaited<ReturnType<typeof getServerSession>>;
  user: User;
};

export const isAuthenticated = async (): Promise<AuthResult> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/auth/login');
  }

  if (user.role === Role.ACCOUNTANT) {
    const subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
    });

    if (!subscription) {
      redirect('/auth/login');
    }
  }

  return { session, user };
};
