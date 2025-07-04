'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma/client';

export const isAuthenticated = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!subscription) {
    redirect('/auth/login');
  }

  return session;
};
