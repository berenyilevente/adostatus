'use server';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth';
import { handleResponse } from '@/utils/handleResponse';
import { revalidatePath } from 'next/cache';
import { CreateBookingForm } from '../booking-form.helper';

export const getBookingForms = async () => {
  await isAuthenticated();

  const bookingForms = await prisma.form.findMany();

  return handleResponse({
    data: bookingForms,
    error: 'Booking forms not found',
    code: 404,
  });
};

export const getForm = async (id: string) => {
  await isAuthenticated();

  const form = await prisma.form.findUnique({
    where: {
      id,
    },
  });

  return handleResponse({
    data: form,
    error: 'Form not found',
    code: 404,
  });
};

export const createBookingForm = async (
  data: CreateBookingForm
): Promise<any> => {
  await isAuthenticated();

  const form = await prisma.form.create({
    data,
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: form,
    error: 'Form creation failed',
    code: 404,
  });
};
