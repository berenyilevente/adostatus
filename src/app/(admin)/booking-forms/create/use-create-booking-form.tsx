'use client';

import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';
import { CreateBookingForm, FormSchemaType } from '../booking-form.helper';
import { createBookingForm } from '../actions';
import { useState } from 'react';
import { toast } from 'sonner';

const useHook = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const toggleCreateFormSheet = () => {
    document.getElementById('create-booking-form-trigger')?.click();
  };

  const onSubmitBookingForm = createForm.handleSubmit(
    async (data: FormSchemaType) => {
      setIsLoading(true);
      const response = await createBookingForm(data);
      if (response.status === 'success') {
        toast.success('Booking form created successfully');
        setIsLoading(false);
        toggleCreateFormSheet();
        return;
      }
      if (response.status === 'error') {
        toast.error('Failed to create booking form');
        setIsLoading(false);
        return;
      }
    }
  );

  return {
    createForm,
    onSubmitBookingForm,
    isLoading,
  };
};

const [useCreateBookingForm, CreateBookingFormProvider] =
  createAppContext(useHook);

export { useCreateBookingForm, CreateBookingFormProvider };
