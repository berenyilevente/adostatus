'use client';

import { Business, Service } from '@/generated/prisma';
import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';
import { CreateBookingForm } from '../booking-form.helper';
import { createBookingForm } from '../actions';

const useHook = () => {
  const createForm = useForm<CreateBookingForm>({
    defaultValues: {
      businessId: '',
      name: '',
      description: '',
      isTemplate: false,
      templateType: '',
      confirmationMessage: '',
      redirectUrl: '',
      allowCancellation: true,
      cancellationNoticeHours: 24,
    },
  });

  const onSubmitBookingForm = createForm.handleSubmit(
    async (data: CreateBookingForm) => {
      await createBookingForm(data);
    }
  );

  return {
    createForm,
    onSubmitBookingForm,
  };
};

const [useCreateBookingForm, CreateBookingFormProvider] =
  createAppContext(useHook);

export { useCreateBookingForm, CreateBookingFormProvider };
