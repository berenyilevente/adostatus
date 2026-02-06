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
): Promise<Response<BusinessHours[]>> => {
  await isAuthenticated();

  // Find existing records that contain any of the days being updated
  const existingRecords = await prisma.businessHours.findMany({
    where: {
      businessId,
      dayOfWeek: { hasSome: hours.dayOfWeek },
    },
  });

  // Remove the days being updated from existing records
  for (const record of existingRecords) {
    const remainingDays = record.dayOfWeek.filter(
      (day) => !hours.dayOfWeek.includes(day)
    );

    if (remainingDays.length > 0) {
      // Update the record to keep the remaining days
      await prisma.businessHours.update({
        where: { id: record.id },
        data: { dayOfWeek: remainingDays },
      });
    } else {
      // Delete the record if no days remain
      await prisma.businessHours.delete({
        where: { id: record.id },
      });
    }
  }

  // Create new record with the updated days
  await prisma.businessHours.create({
    data: { ...hours, businessId },
  });

  // Fetch all records for this business to return
  const allBusinessHours = await prisma.businessHours.findMany({
    where: { businessId },
  });

  revalidatePath('/calendar');
  revalidatePath(`/business/show/${businessId}`);

  return handleResponse<BusinessHours[]>({
    data: allBusinessHours,
    code: 201,
    error: 'Business hours creation failed',
  });
};

export const upsertBreakTimes = async (
  businessId: string,
  breaks: BreakTimesForm
): Promise<Response<BreakTime[]>> => {
  await isAuthenticated();

  // Find existing records that contain any of the days being updated
  const existingRecords = await prisma.breakTime.findMany({
    where: {
      businessId,
      dayOfWeek: { hasSome: breaks.dayOfWeek },
    },
  });

  // Remove the days being updated from existing records
  for (const record of existingRecords) {
    const remainingDays = record.dayOfWeek.filter(
      (day) => !breaks.dayOfWeek.includes(day)
    );

    if (remainingDays.length > 0) {
      // Update the record to keep the remaining days
      await prisma.breakTime.update({
        where: { id: record.id },
        data: { dayOfWeek: remainingDays },
      });
    } else {
      // Delete the record if no days remain
      await prisma.breakTime.delete({
        where: { id: record.id },
      });
    }
  }

  // Create new record with the updated days
  const breakTimes = await prisma.breakTime.create({
    data: { ...breaks, businessId },
  });

  // Fetch all records for this business to return
  const allBreakTimes = await prisma.breakTime.findMany({
    where: { businessId },
  });

  revalidatePath(`/business/show/${businessId}`);
  revalidatePath('/calendar');

  return handleResponse<BreakTime[]>({
    data: allBreakTimes,
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
