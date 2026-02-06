'use server';

import prisma from '@/lib/prisma/client';
import { Response } from '@/types/action.types';

import { isAuthenticated } from '@/lib/auth';
import { handleResponse } from '@/utils/handleResponse';
import { revalidatePath } from 'next/cache';
import { CreateBookingForm } from '../booking-form.helper';
import { config } from '@/config';
import { Business, Form, Service, FormStatus } from '@/generated/prisma';

export type BookingForm = Form & {
  service: Service;
  business: Business;
};

export const getBookingForms = async (): Promise<Response<BookingForm[]>> => {
  const { user } = await isAuthenticated();

  const bookingForms: BookingForm[] = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    include: {
      service: true,
      business: true,
    },
  });

  return handleResponse<BookingForm[]>({
    data: bookingForms,
    error: 'Booking forms not found',
    code: 404,
  });
};

export const getForm = async (id: string) => {
  const { user } = await isAuthenticated();

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
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
  const { user } = await isAuthenticated();

  const form = await prisma.form.create({
    data: {
      name: data.name,
      description: data.description,
      isTemplate: data.isTemplate,
      templateType: data.templateType,
      confirmationMessage: data.confirmationMessage,
      allowCancellation: data.allowCancellation,
      cancellationNoticeHours: data.cancellationNoticeHours,
      status: data.status,
      url: data.url,
      service: { connect: { id: data.serviceId } },
      business: { connect: { id: data.businessId } },
      user: { connect: { id: user.id } },
    },
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
    where: { id },
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
    where: { id },
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
    data: { status: FormStatus.ARCHIVED },
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: form,
    error: 'Form archiving failed',
    code: 404,
  });
};

export const updateFormContent = async (formId: string, content: string) => {
  await isAuthenticated();

  const form = await prisma.form.update({
    where: { id: formId },
    data: { content },
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: form,
    error: 'Form content update failed',
    code: 404,
  });
};

export const publishForm = async (formId: string, content: string) => {
  await isAuthenticated();

  const url = `${config.app.domain}/${formId}`;

  const form = await prisma.form.update({
    where: { id: formId },
    data: { status: FormStatus.LIVE, url, content },
  });

  revalidatePath('/booking-forms');

  return handleResponse({
    data: form,
    error: 'Form publishing failed',
    code: 404,
  });
};
