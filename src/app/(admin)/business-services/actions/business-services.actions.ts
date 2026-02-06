'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import { Service } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';
import { ServicesForm } from '../business-services.helper';
import { revalidatePath } from 'next/cache';

export const getServices = async (
  businessId: string
): Promise<Response<Service[]>> => {
  await isAuthenticated();

  const services = await prisma.service.findMany({
    where: { businessId },
  });

  return handleResponse<Service[]>({
    data: services,
    code: 404,
    error: 'Services not found',
  });
};

export const createService = async (
  service: ServicesForm
): Promise<Response<Service>> => {
  const { user } = await isAuthenticated();

  if (!user.id) {
    return handleResponse<Service>({
      data: null,
      code: 404,
      error: 'User not found',
    });
  }

  const { businessId, teamMemberId, ...serviceData } = service;

  const serviceResult = await prisma.service.create({
    data: {
      ...serviceData,
      userId: user.id,
      business: { connect: { id: businessId } },
      teamMember: { connect: { id: teamMemberId } },
    },
  });

  revalidatePath(`/business/${businessId}`);

  return handleResponse<Service>({
    data: serviceResult,
    code: 404,
    error: 'Service creation failed',
  });
};

export const updateService = async (
  id: string,
  service: ServicesForm
): Promise<Response<Service>> => {
  await isAuthenticated();

  const { formId, ...rest } = service;

  const serviceResult = await prisma.service.update({
    where: { id },
    data: {
      ...rest,
      formId: formId || null,
    },
  });

  revalidatePath(`/business/${service.businessId}`);

  return handleResponse<Service>({
    data: serviceResult,
    code: 404,
    error: 'Service update failed',
  });
};

export const deleteService = async (
  id: string,
  businessId: string
): Promise<Response<Service>> => {
  await isAuthenticated();

  const serviceResult = await prisma.service.delete({
    where: { id },
  });

  revalidatePath(`/business/${businessId}`);

  return handleResponse<Service>({
    data: serviceResult,
    code: 404,
    error: 'Service deletion failed',
  });
};
