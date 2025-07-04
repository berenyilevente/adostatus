'use server';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth';
import { Prisma } from '@/generated/prisma/index';
import { handleResponse } from '@/utils/handleResponse';

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
};

export const createForm = async (
  formData: Prisma.FormCreateInput,
  fields: Prisma.FormFieldCreateInput[]
): Promise<any> => {
  await isAuthenticated();
};
