'use server';

import { FormSubmission } from '@/generated/prisma';
import prisma from '@/lib/prisma/client';
import { handleResponse } from '@/utils/handleResponse';

export const findBookingForm = async (id: string) => {
  const form = await prisma.vwFormsPublic.findUnique({
    where: { id },
  });
  if (!form) {
    return handleResponse({
      data: null,
      code: 404,
      error: 'Form not found',
    });
  }

  return handleResponse({
    data: form,
    code: 200,
    error: undefined,
  });
};

export const createBooking = async ({
  formId,
  formValues,
}: {
  formId: string;
  formValues: FormSubmission['submissionData'];
}) => {
  const submissionData = JSON.stringify(formValues);
  const booking = await prisma.formSubmission.create({
    data: { formId, submissionData },
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
