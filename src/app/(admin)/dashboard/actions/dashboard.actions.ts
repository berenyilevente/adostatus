'use server';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';

export const getUsers = async () => {
  const session = await isAuthenticated();

  const currentUserEmail = session?.user?.email;

  if (!currentUserEmail) {
    return handleResponse({ data: null, error: 'Current user not found', code: 404 });
  }

  const users = await prisma.user.findMany({
    where: {
      email: {
        not: currentUserEmail,
      },
    },
  });

  return handleResponse({ data: users });
};
