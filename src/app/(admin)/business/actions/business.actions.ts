'use server';

import { Response } from '@/types/action.types';
import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma/client';
import { Business } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';

export const createBusiness = async (
  business: any
): Promise<Response<Business>> => {
  await isAuthenticated();

  const businessResult = await prisma.business.create({
    data: business,
  });

  if (!businessResult) {
    return {
      status: 'error',
      data: undefined,
      code: 400,
      errors: 'Business creation failed',
    };
  }

  revalidatePath('/business');
  return {
    status: 'success',
    data: business,
    code: 200,
    errors: undefined,
  };
};

export const getBusiness = async (): Promise<Response<Business>> => {
  const session = await isAuthenticated();

  const business = await prisma.business.findFirst({
    where: {
      ownerId: session.user.id,
    },
  });

  if (!business) {
    return {
      status: 'error',
      data: undefined,
      code: 404,
      errors: 'Business not found',
    };
  }

  return {
    status: 'success',
    data: business,
    code: 200,
    errors: undefined,
  };
};
