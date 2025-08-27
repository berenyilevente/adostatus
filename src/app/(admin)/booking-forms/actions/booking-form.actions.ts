'use server';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth';
import { handleResponse } from '@/utils/handleResponse';
import { revalidatePath } from 'next/cache';
import { CreateBookingForm, CreateFormField } from '../booking-form.helper';

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

export const updateBookingForm = async (
  id: string,
  data: Partial<CreateBookingForm>
): Promise<any> => {
  await isAuthenticated();

  const form = await prisma.form.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: form,
    error: 'Form update failed',
    code: 404,
  });
};

export const deleteBookingForm = async (id: string) => {
  await isAuthenticated();

  const form = await prisma.form.delete({
    where: {
      id,
    },
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: form,
    error: 'Form deletion failed',
    code: 404,
  });
};

export const archiveBookingForm = async (id: string) => {
  await isAuthenticated();

  const form = await prisma.form.update({
    where: { id },
    data: { status: 'archived', isActive: false },
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: form,
    error: 'Form archiving failed',
    code: 404,
  });
};

export const upsertBookingFormFields = async (
  fields: CreateFormField[]
): Promise<any> => {
  await isAuthenticated();

  if (!fields.length) {
    return handleResponse({
      data: [],
      error: 'No fields provided',
      code: 400,
    });
  }

  const formId = fields[0].formId;

  const formFields = await prisma.$transaction(async (tx) => {
    // Delete existing form fields
    await tx.formField.deleteMany({
      where: {
        formId: formId,
      },
    });

    // Create new form fields
    return await tx.formField.createMany({
      data: fields.map((field) => ({
        ...field,
        validationRules: field.validationRules || undefined,
      })),
    });
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: formFields,
    error: 'Form fields creation failed',
    code: 404,
  });
};

export const getFormFields = async (formId: string) => {
  await isAuthenticated();

  const formFields = await prisma.formField.findMany({
    where: { formId },
  });

  return handleResponse({
    data: formFields,
    error: 'Form fields not found',
    code: 404,
  });
};
