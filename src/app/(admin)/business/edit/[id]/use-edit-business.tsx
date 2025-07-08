'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FilePondFile } from 'filepond';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';

import {
  CreateBusinessForm,
  CreateBusinessSchema,
} from '../../business.helper';
import { setImage } from '@/utils/image';
import { Business, Service } from '@/generated/prisma';

type HookProp = {
  business: Business;
  services: Service[];
};

const useHook = ({ business, services }: HookProp) => {
  const router = useRouter();
  const { id: businessId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const businessForm = useForm<CreateBusinessForm>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: {
      business: {
        businessType: business.businessType ?? undefined,
        name: business.name ?? undefined,
        description: business.description ?? undefined,
        logoUrl: business.logoUrl ?? undefined,
        primaryColor: business.primaryColor ?? undefined,
        isActive: business.isActive ?? true,
      },
    },
  });

  const handleChangeImage = (fileItems: FilePondFile[]) => {
    setImage({
      fileItems,
      setValue: businessForm.setValue,
      name: 'business.logoUrl',
    });
  };

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
    services,
  };
};

const [useEditBusiness, EditBusinessProvider] = createAppContext(useHook);
export { useEditBusiness, EditBusinessProvider };
