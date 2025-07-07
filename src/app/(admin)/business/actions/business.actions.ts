'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import { Business, Service } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';
import { revalidatePath } from 'next/cache';
import { CreateBusinessForm } from '../business.helper';

export const createBusiness = async (
  createBusinessForm: CreateBusinessForm
): Promise<Response<Business>> => {
  const { user } = await isAuthenticated();
  const { business, businessHours, breakTimes } = createBusinessForm;

  const createBusinessResult = await prisma.$transaction(async (tx) => {
    if (!user.id) {
      return null;
    }

    const businessResult = await tx.business.create({
      data: {
        ...business,
        ownerId: user.id,
      },
    });
    await tx.businessHours.createMany({
      data: { ...businessHours, businessId: businessResult.id },
    });
    await tx.breakTime.createMany({
      data: { ...breakTimes, businessId: businessResult.id },
    });

    revalidatePath('/business');

    return businessResult;
  });

  return handleResponse<Business>({
    data: createBusinessResult,
    error: 'Business creation failed',
    code: 400,
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

export const createService = async (
  service: any
): Promise<Response<Service>> => {
  await isAuthenticated();

  const serviceResult = await prisma.service.create({
    data: service,
  });

  revalidatePath(`/business/${service.businessId}`);

  return handleResponse<Service>({
    data: serviceResult,
    code: 404,
    error: 'Service creation failed',
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
