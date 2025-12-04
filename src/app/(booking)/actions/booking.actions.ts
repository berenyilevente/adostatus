'use server';

import { CreateAppointment } from '@/app/(admin)/calendar/calendar.helper';
import { FormSubmission, VwFormsPublic } from '@/generated/prisma';
import prisma from '@/lib/prisma/client';
import { handleResponse } from '@/utils/handleResponse';
import { Response } from '@/types/action.types';

export const findBookingForm = async (
  id: string
): Promise<Response<VwFormsPublic>> => {
  const form = await prisma.vwFormsPublic.findUnique({
    where: { id },
  });
  if (!form) {
    return handleResponse<VwFormsPublic>({
      data: null,
      code: 404,
      error: 'Form not found',
    });
  }

  return handleResponse<VwFormsPublic>({
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
  vwForm: VwFormsPublic;
  formValues: FormSubmission['submissionData'];
  appointmentData: { title: string; start: string; end: string };
}) => {
  const { id: formId, businessId } = vwForm;
  const submissionData = JSON.stringify(formValues);

  const booking = await prisma.appointment.create({
    data: {
      formId,
      businessId,
      content: submissionData,
      ...appointmentData,
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
