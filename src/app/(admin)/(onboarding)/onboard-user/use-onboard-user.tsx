'use client';

import { useState } from 'react';

import { createAppContext } from '@/hooks/use-create-app-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BusinessFormData, businessSchema } from './onboard-user.helper';

const useHook = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessType: '',
      name: '',
      description: '',
      logoUrl: '',
      primaryColor: '#000000',
      businessHours: [],
      services: [],
      customBusinessType: '',
    },
  });

  return {
    currentStep,
    setCurrentStep,
    form,
  };
};

const [useOnboardUser, OnboardUserProvider] = createAppContext(useHook);
export { useOnboardUser, OnboardUserProvider };
