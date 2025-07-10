'use server';

import { Response } from '@/types/action.types';

import prisma from '@/lib/prisma/client';
import { Appointment } from '@/generated/prisma';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';
import { CreateAppointment } from '../calendar.helper';
import { revalidatePath } from 'next/cache';

export const getAppointments = async (
  businessIds: string[]
): Promise<Response<Appointment[]>> => {
  await isAuthenticated();

  const appointments = await prisma.appointment.findMany({
    where: { businessId: { in: businessIds } },
  });

  return handleResponse<Appointment[]>({
    data: appointments,
    code: 404,
    error: 'Appointments not found',
  });
};

export const createAppointment = async (
  appointment: CreateAppointment
): Promise<Response<Appointment>> => {
  await isAuthenticated();

  const formData = JSON.stringify(appointment.formData);

  const newAppointment = await prisma.appointment.create({
    data: { ...appointment, formData },
  });

  revalidatePath(`/calendar?business=${appointment.businessId}`);

  return handleResponse<Appointment>({
    data: newAppointment,
    code: 201,
    error: 'Appointment creation failed',
  });
};
