'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import {
  BreakTime,
  Business,
  BusinessHours,
  Service,
} from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';
import { revalidatePath } from 'next/cache';
import { BusinessForm } from '../business.helper';
import { config } from '@/config';

export const createBusiness = async (
  business: BusinessForm
): Promise<Response<Business>> => {
  const { user } = await isAuthenticated();

  if (!user.id) {
    return handleResponse<Business>({
      data: null,
      code: 404,
      error: 'Owner not found',
    });
  }

  const createBusinessResult = await prisma.business.create({
    data: {
      ...business,
      ownerId: user.id,
    },
  });

  revalidatePath('/business');

  return handleResponse<Business>({
    data: createBusinessResult,
    error: 'Business creation failed',
    code: 400,
  });
};

export type BusinessResponse = Business & {
  businessHours: BusinessHours[];
  breakTimes: BreakTime[];
};

export const getBusiness = async (
  id: string
): Promise<Response<BusinessResponse>> => {
  const session = await isAuthenticated();

  const business = await prisma.business.findFirst({
    where: {
      ownerId: session.user.id,
      id,
    },
  });

  if (!business) {
    return handleResponse<BusinessResponse>({
      data: null,
      code: 404,
      error: 'Business not found' as string,
    });
  }

  const businessHours = await prisma.businessHours.findMany({
    where: { businessId: id },
  });

  const breakTimes = await prisma.breakTime.findMany({
    where: { businessId: id },
  });

  return handleResponse<BusinessResponse>({
    data: { ...business, businessHours, breakTimes },
    code: 404,
    error: 'Business not found',
  });
};

export const getBusinesses = async (): Promise<Response<Business[]>> => {
  const session = await isAuthenticated();

  const businesses = await prisma.business.findMany({
    where: {
      ownerId: session.user.id,
    },
  });

  return handleResponse<Business[]>({
    data: businesses,
    code: 404,
    error: 'Business not found',
  });
};

export const deleteBusiness = async (
  id: string
): Promise<Response<Business>> => {
  await isAuthenticated();

  const businessResult = await prisma.business.delete({
    where: { id },
  });

  revalidatePath('/business');

  return handleResponse<Business>({
    data: businessResult,
    code: 404,
    error: 'Business deletion failed',
  });
};

export const updateBusiness = async (
  id: string,
  business: BusinessForm
): Promise<Response<Business>> => {
  await isAuthenticated();

  const businessResult = await prisma.business.update({
    where: { id },
    data: business,
  });

  revalidatePath(`/business/${id}`);

  return handleResponse<Business>({
    data: businessResult,
    code: 404,
    error: 'Business update failed',
  });
};
