'use server';

import { Response } from '@/types/action.types';
import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/utils/isAuthenticated';

import { BusinessFormData } from '../onboard-user.helper';

export const createBusiness = async (
  business: BusinessFormData
): Promise<Response<BusinessFormData>> => {
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

  revalidatePath('/onboard-user');

  return {
    status: 'success',
    data: business,
    code: 200,
    errors: undefined,
  };
};
