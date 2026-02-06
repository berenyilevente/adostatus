import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth/isAuthenticated';
import { Response } from '@/types/action.types';

export const getUsers = async (): Promise<Response<any[]>> => {
  const session = await isAuthenticated();

  const currentUserEmail = session?.user?.email;

  if (!currentUserEmail) {
    return {
      status: 'error',
      data: null,
      code: 404,
      error: 'Current user not found',
    };
  }

  const users: any[] = await prisma.user.findMany({
    where: {
      email: {
        not: currentUserEmail,
      },
    },
  });

  return {
    status: 'success',
    data: users,
    code: 200,
    error: null,
  };
};
