'use server';

import { Response } from '@/types/action.types';
import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/utils/isAuthenticated';

import { BusinessForm } from '../onboarding.helper';

export const createBusiness = async (
  business: BusinessForm
): Promise<Response<BusinessForm>> => {
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

  revalidatePath('/onboarding');

  return {
    status: 'success',
    data: business,
    code: 200,
    errors: undefined,
  };
};
