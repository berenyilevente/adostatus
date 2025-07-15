'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FilePondFile } from 'filepond';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';

import { BusinessForm, BusinessSchema } from '../../business.helper';
import { setImage } from '@/utils/image';
import { Business } from '@/generated/prisma';

type HookProp = {
  business: Business;
};

const useHook = ({ business }: HookProp) => {
  const router = useRouter();
  const { id: businessId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const businessForm = useForm<BusinessForm>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      businessType: business.businessType ?? undefined,
      name: business.name ?? undefined,
      description: business.description ?? undefined,
      logoUrl: business.logoUrl ?? undefined,
      primaryColor: business.primaryColor ?? undefined,
      isActive: business.isActive ?? true,
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
    isLoading,
    onBusinessSubmit,
    handleCancel,
    handleChangeImage,
  };
};

const [useEditBusiness, EditBusinessProvider] = createAppContext(useHook);
export { useEditBusiness, EditBusinessProvider };
