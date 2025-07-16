'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import { BreakTime, BusinessHours } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';
import { BreakTimesForm, BusinessHoursForm } from '../business-hours.helper';
import { revalidatePath } from 'next/cache';

export const upsertBusinessHours = async (
  businessId: string,
  hours: BusinessHoursForm
): Promise<Response<BusinessHours>> => {
  await isAuthenticated();

  const businessHours = await prisma.businessHours.upsert({
    where: {
      businessId_dayOfWeek: { businessId, dayOfWeek: hours.dayOfWeek },
    },
    update: { ...hours },
    create: { ...hours, businessId },
  });
  revalidatePath('/calendar');

  return handleResponse<BusinessHours>({
    data: businessHours,
    code: 201,
    error: 'Business hours creation failed',
  });
};

export const upsertBreakTimes = async (
  businessId: string,
  breaks: BreakTimesForm
): Promise<Response<BreakTime>> => {
  await isAuthenticated();

  const breakTimes = await prisma.breakTime.upsert({
    where: {
      businessId_dayOfWeek: { businessId, dayOfWeek: breaks.dayOfWeek },
    },
    update: { ...breaks },
    create: { ...breaks, businessId },
  });

  return handleResponse<BreakTime>({
    data: breakTimes,
    code: 201,
    error: 'Break times creation failed',
  });
};

export const getBusinessHours = async ({
  businessId,
}: {
  businessId: string;
}): Promise<Response<BusinessHours[]>> => {
  await isAuthenticated();

  const businessHours = await prisma.businessHours.findMany({
    where: { businessId },
  });

  return handleResponse<BusinessHours[]>({
    data: businessHours,
    code: 200,
  });
};

export const getBreakTimes = async ({
  businessId,
}: {
  businessId: string;
}): Promise<Response<BreakTime[]>> => {
  await isAuthenticated();

  const breakTimes = await prisma.breakTime.findMany({
    where: { businessId },
  });

  return handleResponse<BreakTime[]>({
    data: breakTimes,
    code: 200,
  });
};
