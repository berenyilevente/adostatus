'use client';

import { useState } from 'react';

import { createAppContext } from '@/hooks/use-create-app-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BusinessFormData, businessSchema } from './onboard-user.helper';
import { createBusiness } from './actions/onboard-user.actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const useHook = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessType: '',
      name: '',
      description: '',
      logoUrl: '',
      primaryColor: '#000000',
      isActive: true,
      ownerId: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (data: BusinessFormData) => {
    if (!session.data?.user?.id) {
      return;
    }
    setIsLoading(true);

    const response = await createBusiness({
      ...data,
      ownerId: session.data.user.id,
    });

    if (response.status === 'success') {
      setIsLoading(false);
      setCurrentStep(currentStep + 1);
    }
  });

  return {
    currentStep,
    setCurrentStep,
    form,
    onSubmit,
    isLoading,
  };
};

const [useOnboardUser, OnboardUserProvider] = createAppContext(useHook);
export { useOnboardUser, OnboardUserProvider };
