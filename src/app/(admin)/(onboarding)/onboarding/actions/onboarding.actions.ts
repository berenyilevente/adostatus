'use server';

import { Response } from '@/types/action.types';
import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/utils/isAuthenticated';

import { BusinessForm } from '../onboarding.helper';
import { handleResponse } from '@/utils/handleResponse';

export const createBusiness = async (
  business: BusinessForm
): Promise<Response<BusinessForm>> => {
  await isAuthenticated();

  const businessResult = await prisma.business.create({
    data: business,
  });

  return handleResponse({
    data: businessResult,
    error: 'Business creation failed',
    code: 400,
  });
};
