'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FilePondFile } from 'filepond';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';

import {
  CreateBusinessForm,
  CreateBusinessSchema,
  ServicesForm,
  ServicesSchema,
} from '../business.helper';
import { setImage } from '@/utils/image';
import { Business, Service } from '@/generated/prisma';
import { createService } from '../actions/business.actions';

type HookProp = {
  business: Business;
  services: Service[];
};

const useHook = ({ business, services }: HookProp) => {
  const router = useRouter();
  const { id: businessId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const businessForm = useForm<CreateBusinessForm>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: {
      business: {
        businessType: business.businessType ?? undefined,
        name: business.name ?? undefined,
        description: business.description ?? undefined,
        logoUrl: business.logoUrl ?? undefined,
        primaryColor: business.primaryColor ?? undefined,
        isActive: true,
      },
    },
  });

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

  const handleChangeImage = (fileItems: FilePondFile[]) => {
    setImage(fileItems, businessForm.setValue);
  };

  const onServicesSubmit = servicesForm.handleSubmit(async (data) => {
    await createService(data);

    servicesForm.reset();
    setIsServicesModalOpen(false);
  });

  const onBusinessSubmit = businessForm.handleSubmit(async (data) => {
    if (!businessId) {
      return;
    }

    setIsLoading(true);

    setIsLoading(false);
  });

  const handleCancel = () => {
    router.back();
  };

  return {
    businessForm,
    onBusinessSubmit,
    handleCancel,
    handleChangeImage,
    isLoading,
    servicesForm,
    onServicesSubmit,
    services,
    isServicesModalOpen,
    setIsServicesModalOpen,
  };
};

const [useEditBusiness, EditBusinessProvider] = createAppContext(useHook);
export { useEditBusiness, EditBusinessProvider };
