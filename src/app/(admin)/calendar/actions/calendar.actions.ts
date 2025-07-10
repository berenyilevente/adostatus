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

export const getAppointment = async (
  id: string
): Promise<Response<Appointment>> => {
  await isAuthenticated();

  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  return handleResponse<Appointment>({
    data: appointment,
    code: 404,
    error: 'Appointment not found',
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

export const updateAppointment = async (
  id: string,
  appointment: CreateAppointment
): Promise<Response<Appointment>> => {
  await isAuthenticated();

  const formData = JSON.stringify(appointment.formData);

  const updatedAppointment = await prisma.appointment.update({
    where: { id },
    data: { ...appointment, formData },
  });

  revalidatePath(`/calendar?business=${appointment.businessId}`);

  return handleResponse<Appointment>({
    data: updatedAppointment,
    code: 200,
    error: 'Appointment update failed',
  });
};

export const deleteAppointment = async (
  id: string
): Promise<Response<Appointment>> => {
  await isAuthenticated();

  const deletedAppointment = await prisma.appointment.delete({
    where: { id },
  });

  revalidatePath(`/calendar?business=${deletedAppointment.businessId}`);

  return handleResponse<Appointment>({
    data: deletedAppointment,
    code: 200,
    error: 'Appointment deletion failed',
  });
};
