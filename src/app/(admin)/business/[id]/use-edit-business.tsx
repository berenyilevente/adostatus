'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FilePondFile } from 'filepond';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';

import { BusinessForm, BusinessSchema } from '../business.helper';
import { setImage } from '@/utils/image';
import { Business } from '@/generated/prisma';

type HookProp = {
  business: Business;
};

const useHook = ({ business }: HookProp) => {
  const router = useRouter();
  const { id: userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BusinessForm>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      name: business.name ?? undefined,
      ownerId: business.ownerId ?? undefined,
      description: business.description ?? undefined,
      businessType: business.businessType ?? undefined,
      logoUrl: business.logoUrl ?? undefined,
      primaryColor: business.primaryColor ?? undefined,
      isActive: business.isActive ?? undefined,
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

  const onSubmit = handleSubmit(async (data) => {
    if (!userId) {
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
    userImage: watch('logoUrl'),
    isLoading,
  };
};

const [useEditBusiness, EditBusinessProvider] = createAppContext(useHook);
export { useEditBusiness, EditBusinessProvider };
