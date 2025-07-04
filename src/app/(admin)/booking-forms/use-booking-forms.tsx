'use client';

import { useForm } from 'react-hook-form';

import { Business, Form } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';

type HookProp = {
  bookingFormsData: Form[];
  businessData: Business[];
};

const useHook = ({ bookingFormsData, businessData }: HookProp) => {
  const filterForm = useForm({
    defaultValues: {
      search: '',
      business: '',
    },
  });

  const { watch } = filterForm;

  const search = watch('search');

  return {
    search,
    filterForm,
    businessData,
  };
};

const [useBookingForms, BookingFormsProvider] = createAppContext(useHook);

export { useBookingForms, BookingFormsProvider };
