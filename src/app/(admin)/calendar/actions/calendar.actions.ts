'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import { Appointment } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';

export const getAppointments = async (
  businessId: string
): Promise<Response<Appointment[]>> => {
  await isAuthenticated();

  const appointments = await prisma.appointment.findMany({
    where: { businessId },
  });

  return handleResponse<Appointment[]>({
    data: appointments,
    code: 404,
    error: 'Appointments not found',
  });
};
