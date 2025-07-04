'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import { Business, Service } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';

export const createBusiness = async (
  business: any
): Promise<Response<Business>> => {
  await isAuthenticated();

  const businessResult = await prisma.business.create({
    data: business,
  });

  return handleResponse({
    data: businessResult,
    error: 'Business creation failed',
    code: 400,
    path: '/business',
  });
};

export const getBusiness = async (id: string): Promise<Response<Business>> => {
  const session = await isAuthenticated();

  const business = await prisma.business.findFirst({
    where: {
      ownerId: session.user.id,
      id,
    },
  });

  return handleResponse<Business>({
    data: business,
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

export const getServices = async (
  businessId: string
): Promise<Response<Service[]>> => {
  await isAuthenticated();

  const services = await prisma.service.findMany({
    where: {
      businessId: businessId,
    },
  });

  return handleResponse<Service[]>({
    data: services,
    code: 404,
    error: 'Services not found',
  });
};
