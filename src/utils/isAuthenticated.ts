'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth';
import { redirect } from 'next/navigation';

export const isAuthenticated = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return session;
};
