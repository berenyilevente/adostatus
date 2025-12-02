'use client';

import { createAppContext } from '@/hooks/use-create-app-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createBooking } from '../actions/booking.actions';
import { FormElementInstance } from '@/app/(admin)/booking-forms/[id]/edit-form.helper';

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
  formFields: FormElementInstance[];
  formId: string;
};

const useHook = ({ formFields, formId }: HookProp) => {
  const schema = z.object(createSchema(formFields));
  type FormSchema = z.infer<typeof schema>;

  // TODO schema validation
  const form = useForm<FormSchema>();

  const [transition, startTransition] = useTransition();

  const onSubmit = form.handleSubmit(async (data: FormSchema) => {
    const dataWithFieldTypes = Object.entries(data).map(([key, value]) => {
      return {
        value: value,
        type: formFields.find((field) => field.extraAttributes?.name === key)
          ?.type,
        name: key,
        label: formFields.find((field) => field.extraAttributes?.name === key)
          ?.extraAttributes?.label,
      };
    });

    startTransition(async () => {
      const response = await createBooking({
        formId: formId,
        formValues: dataWithFieldTypes,
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
