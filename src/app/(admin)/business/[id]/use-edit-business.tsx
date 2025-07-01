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
import { Business } from '@/generated/prisma';

type HookProp = {
  business: Business;
};

const useHook = ({ business }: HookProp) => {
  const router = useRouter();
  const { id: businessId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<ServicesForm[]>([]);

  const form = useForm<CreateBusinessForm>({
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
      name: '',
      description: '',
      isActive: true,
      businessId: businessId?.toString(),
      color: '',
      currency: '',
      duration: '',
      bufferTime: '',
      price: '',
    },
  });

  const { control, handleSubmit, watch, setValue, setError } = form;

  const setErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const handleChangeImage = (fileItems: FilePondFile[]) => {
    setImage(fileItems, setValue);
  };

  const handleServicesSubmit = servicesForm.handleSubmit(async (data) => {
    console.log(data);
    setServices([...services, data]);
    servicesForm.reset();
  });

  const onSubmit = handleSubmit(async (data) => {
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
    form,
    onSubmit,
    handleCancel,
    handleChangeImage,
    isLoading,
    servicesForm,
    handleServicesSubmit,
    services,
  };
};

const [useEditBusiness, EditBusinessProvider] = createAppContext(useHook);
export { useEditBusiness, EditBusinessProvider };
