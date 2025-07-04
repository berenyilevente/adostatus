'use client';

import { useForm } from 'react-hook-form';

import { Business, Form, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';

type HookProp = {
  bookingFormsData: Form[];
  businessData: Business[];
};

const useHook = ({ bookingFormsData, businessData }: HookProp) => {
  const [services, setServices] = useState<Service[]>([]);

  const filterForm = useForm({
    defaultValues: {
      search: '',
      business: '',
    },
  });
  const createForm = useForm({
    defaultValues: {
      business: '',
      service: '',
      title: '',
    },
  });

  const businessOptions = businessData.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  // If add service, render the create service form below the select
  const serviceOptions = [
    ...services.map((service) => ({
      label: service.name,
      value: service.id,
    })),
    {
      label: 'Add service',
      value: 'add-service',
    },
  ];

  const { watch } = filterForm;

  const search = watch('search');

  return {
    search,
    filterForm,
    businessData,
    createForm,
    serviceOptions,
    businessOptions,
  };
};

const [useBookingForms, BookingFormsProvider] = createAppContext(useHook);

export { useBookingForms, BookingFormsProvider };
