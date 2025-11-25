'use client';

import { FormElementInstance } from '@/app/(admin)/booking-forms/[id]/components/FormElements';

import { createAppContext } from '@/hooks/use-create-app-context';
import { createBooking } from '../actions/booking.actions';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const createSchema = (formFields: FormElementInstance[]) => {
  return formFields.reduce(
    (acc, formField) => {
      if (formField.extraAttributes?.required === false) {
        return acc;
      }

      acc[formField.id] = z.string().min(1);
      return acc;
    },
    {} as Record<string, z.ZodSchema>
  );
};

type HookProp = {
  formFields: FormElementInstance[];
  formId: string;
};

const useHook = ({ formFields, formId }: HookProp) => {
  const schema = z.object(createSchema(formFields));

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data: z.infer<typeof schema>) => {
    const response = await createBooking({
      formId: formId,
      formValues: data,
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

  return { formFields, onSubmit, form };
};

const [useBooking, BookingProvider] = createAppContext(useHook);

export { BookingProvider, useBooking };
