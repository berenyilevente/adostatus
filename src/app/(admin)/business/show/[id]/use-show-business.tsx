'use client';

import { useParams, useRouter } from 'next/navigation';

import { createAppContext } from '@/hooks/use-create-app-context';

import { Service } from '@/generated/prisma';
import {
  BusinessResponse,
  createService,
} from '../../actions/business.actions';
import { ServicesForm, ServicesSchema } from '../../business.helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

type HookProp = {
  business: BusinessResponse;
  services: Service[];
};

const useHook = ({ business, services }: HookProp) => {
  const router = useRouter();
  const { id: businessId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const servicesForm = useForm<ServicesForm>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: {
      businessId: businessId?.toString(),
      name: '',
      description: '',
      isActive: true,
      currency: '',
      duration: '',
      bufferTime: '',
      price: '',
      color: null,
      formId: null,
    },
  });

  const onServicesSubmit = servicesForm.handleSubmit(async (data) => {
    await createService(data);

    servicesForm.reset();
    setIsServicesModalOpen(false);
  });

  const handleCancel = () => {
    router.back();
  };

  return {
    business,
    handleCancel,
    isLoading,
    servicesForm,
    onServicesSubmit,
    services,
    isServicesModalOpen,
    setIsServicesModalOpen,
  };
};

const [useShowBusiness, ShowBusinessProvider] = createAppContext(useHook);
export { useShowBusiness, ShowBusinessProvider };
