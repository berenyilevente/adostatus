'use client';

import { createAppContext } from '@/hooks/use-create-app-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createBooking } from '../actions/booking.actions';
import { FormElementInstance } from '@/app/(admin)/booking-forms/[id]/edit-form.helper';
import { VwFormsPublic } from '@/generated/prisma';
import dayjs from 'dayjs';

const createSchema = (formFields: FormElementInstance[]) => {
  if (!formFields?.length) {
    return {} as Record<string, z.ZodSchema>;
  }

  return formFields.reduce(
    (acc, formField) => {
      if (
        formField.type === 'TextField' &&
        formField.extraAttributes?.required
      ) {
        acc[formField.extraAttributes?.name] = z.string().min(1);
        return acc;
      }

      return acc;
    },
    {} as Record<string, z.ZodSchema<any>>
  );
};

type HookProp = {
  vwForm: VwFormsPublic;
};

const useHook = ({ vwForm }: HookProp) => {
  const formFields = vwForm?.content as FormElementInstance[];
  const schema = z.object(createSchema(formFields));
  type FormSchema = z.infer<typeof schema>;

  // TODO schema validation
  const form = useForm<FormSchema>();

  const [transition, startTransition] = useTransition();

  const constructFormValues = (data: FormSchema) => {
    return Object.entries(data).map(([name, value]) => {
      const currentField = formFields.find(
        (field) => field.extraAttributes?.name === name
      );

      const type = currentField?.type;
      const label = currentField?.extraAttributes?.label;

      return { value, type, name, label };
    });
  };

  const getStartAndEndTime = (data: FormSchema) => {
    // booking_date is a Date object, start_time and end_time are "HH:MM" strings
    const bookingDate = dayjs(data.booking_date);
    const start = bookingDate
      .hour(parseInt(data.start_time.split(':')[0]))
      .minute(parseInt(data.start_time.split(':')[1]))
      .second(0)
      .millisecond(0)
      .toISOString();

    const end = bookingDate
      .hour(parseInt(data.end_time.split(':')[0]))
      .minute(parseInt(data.end_time.split(':')[1]))
      .second(0)
      .millisecond(0)
      .toISOString();

    return { start, end };
  };

  const onSubmit = form.handleSubmit(async (form: FormSchema) => {
    const { start, end } = getStartAndEndTime(form);
    const formValues = constructFormValues(form);
    const title = formFields.find((value) => value.type === 'TitleField')
      ?.extraAttributes?.title;

    startTransition(async () => {
      const response = await createBooking({
        vwForm,
        formValues,
        appointmentData: { title, start, end },
      });

      if (response.status === 'success') {
        toast.success('Booking created successfully');
        return;
      }
      if (response.status === 'error') {
        toast.error('Failed to create booking');
        return;
      }
    });
  });

  return { formFields, onSubmit, form, transition };
};

const [useBooking, BookingProvider] = createAppContext(useHook);

export { BookingProvider, useBooking };
