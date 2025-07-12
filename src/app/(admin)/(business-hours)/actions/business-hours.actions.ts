'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import { BusinessHours } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';
import { CreateBusinessHoursForm } from '../business-hours.helper';

export const upsertBusinessHours = async (
  businessId: string,
  hours: CreateBusinessHoursForm
): Promise<Response<BusinessHours>> => {
  await isAuthenticated();

  // TODO: upsert business hours and break times
  const businessHours = await prisma.$transaction(async (tx) => {
    const businessHours = await tx.businessHours.create({
      data: { ...hours.businessHours, businessId },
    });

    const breakTimes = await tx.breakTime.createMany({
      data: { ...hours.breakTimes, businessId },
    });

    return { businessHours, breakTimes };
  });

  return handleResponse<BusinessHours>({
    data: businessHours.businessHours,
    code: 201,
    error: 'Business hours creation failed',
  });
};
