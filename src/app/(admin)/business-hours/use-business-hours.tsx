'use client';

import { Business } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { upsertBusinessHours } from './actions/business-hours.actions';
import {
  CreateBusinessHoursForm,
  CreateBusinessHoursSchema,
} from './business-hours.helper';

type HookProp = {
  businesses: Business[];
};

const useHook = ({ businesses }: HookProp) => {
  const [isBusinessHoursDialogOpen, setIsBusinessHoursDialogOpen] =
    useState(false);

  const filterForm = useForm({
    defaultValues: {
      business: businesses[0].id,
    },
  });

  const businessId = filterForm.watch('business');
  const business = businesses.find((business) => business.id === businessId);
  const businessName = business?.name;

  const businessHoursForm = useForm<CreateBusinessHoursForm>({
    resolver: zodResolver(CreateBusinessHoursSchema),
    defaultValues: {
      businessHours: {
        businessId: '',
      },
      breakTimes: {
        businessId: '',
      },
    },
  });

  const onSubmitBusinessHours = businessHoursForm.handleSubmit(async (data) => {
    await upsertBusinessHours(businessId, data);
  });

  return {
    businesses,
    filterForm,
    businessName,
    businessHoursForm,
    isBusinessHoursDialogOpen,
    onSubmitBusinessHours,
    setIsBusinessHoursDialogOpen,
  };
};

const [useBusinessHours, BusinessHoursProvider] = createAppContext(useHook);

export { useBusinessHours, BusinessHoursProvider };
