'use client';

import { useForm } from 'react-hook-form';

import { Business, Form, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState } from 'react';
import { getServices } from '../business/actions/business.actions';
import { createBookingForm } from './actions';
import { CreateBookingForm } from './booking-form.helper';

type HookProp = {
  bookingForms: Form[];
  businessData: Business[];
};

const useHook = ({ bookingForms, businessData }: HookProp) => {
  const [services, setServices] = useState<Service[]>([]);

  const filterForm = useForm({
    defaultValues: {
      search: '',
      business: '',
    },
  });

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
  ];

  const search = filterForm.watch('search');
  const businessId = createForm.watch('businessId');

  const getServicesFromBusiness = async (businessId: string) => {
    const response = await getServices(businessId);
    if (response.status === 'success' && response.data) {
      setServices(response.data);
    }
  };

  useEffect(() => {
    if (businessId) {
      getServicesFromBusiness(businessId);
    }
  }, [businessId]);

  const onSubmitBookingForm = createForm.handleSubmit(
    async (data: CreateBookingForm) => {
      await createBookingForm(data);
    }
  );

  return {
    bookingForms,
    search,
    filterForm,
    businessData,
    createForm,
    serviceOptions,
    businessOptions,
    onSubmitBookingForm,
  };
};

const [useBookingForms, BookingFormsProvider] = createAppContext(useHook);

export { useBookingForms, BookingFormsProvider };
