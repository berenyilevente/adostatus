'use server';

import { vw_forms_public } from '@/generated/prisma';
import prisma from '@/lib/prisma/client';
import { handleResponse } from '@/utils/handleResponse';
import { Response } from '@/types/action.types';

export const findBookingForm = async (
  id: string
): Promise<Response<vw_forms_public>> => {
  const form = await prisma.vw_forms_public.findUnique({
    where: { id },
  });
  if (!form) {
    return handleResponse<vw_forms_public>({
      data: null,
      code: 404,
      error: 'Form not found',
    });
  }

  return handleResponse<vw_forms_public>({
    data: form,
    code: 200,
    error: undefined,
  });
};

export const createBooking = async ({
  vwForm,
  formValues,
  appointmentData,
}: {
  vwForm: vw_forms_public;
  formValues: unknown;
  appointmentData: { title: string; start: string; end: string };
}) => {
  const { id: formId, businessId } = vwForm;

  if (!businessId) {
    return handleResponse({
      data: null,
      code: 400,
      error: 'Business ID is required',
    });
  }

  // Look up the form to get the serviceId
  const form = await prisma.form.findUnique({
    where: { id: formId },
    select: { serviceId: true },
  });

  if (!form) {
    return handleResponse({
      data: null,
      code: 404,
      error: 'Form not found',
    });
  }

  // Look up the service to get the teamMemberId
  const service = await prisma.service.findUnique({
    where: { id: form.serviceId },
    select: { teamMemberId: true },
  });

  if (!service) {
    return handleResponse({
      data: null,
      code: 404,
      error: 'Service not found',
    });
  }

  const submissionData = JSON.stringify(formValues);

  const booking = await prisma.appointment.create({
    data: {
      formId,
      businessId,
      serviceId: form.serviceId,
      teamMemberId: service.teamMemberId,
      content: submissionData,
      title: appointmentData.title,
      start: appointmentData.start,
      end: appointmentData.end,
    },
  });

  if (!booking) {
    return handleResponse({
      data: null,
      code: 404,
      error: 'Booking creation failed',
    });
  }

  return handleResponse({
    data: booking,
    code: 200,
    error: undefined,
  });
};
