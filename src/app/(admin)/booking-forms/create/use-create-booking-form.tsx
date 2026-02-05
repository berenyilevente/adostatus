'use client';

import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';
import { CreateBookingForm, FormSchemaType } from '../booking-form.helper';
import { createBookingForm } from '../actions';

const useHook = () => {
  const createForm = useForm<FormSchemaType>({
    defaultValues: {
      businessId: '',
      serviceId: '',
      name: '',
      description: '',
      isTemplate: false,
      templateType: '',
      confirmationMessage: '',
      url: '',
      allowCancellation: true,
      cancellationNoticeHours: 24,
      status: 'DRAFT',
      userId: '',
    },
  });

  const onSubmitBookingForm = createForm.handleSubmit(
    async (data: FormSchemaType) => {
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
