'use client';

import { Form, FormField } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { createEmptyFormField } from '../booking-form.helper';

import { toast } from 'sonner';

export type FormFieldItem = ReturnType<typeof createEmptyFormField> & {
  tempId: string;
};

type HookProp = {
  formData: Form | null;
  formFieldsData: FormField[] | null;
};

function useEditBookingFormHook({ formData, formFieldsData }: HookProp) {
  const onSubmit = async () => {
    if (!formData?.id) {
      toast.error('Form ID not found');
      return;
    }
  };

  return { formData, onSubmit };
}

export const [useEditBookingForm, EditBookingFormProvider] = createAppContext(
  useEditBookingFormHook
);
