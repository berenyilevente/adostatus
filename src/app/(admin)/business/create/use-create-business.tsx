'use client';

import { FilePondFile } from 'filepond';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { createAppContext } from '@/hooks/use-create-app-context';
import { setImage } from '@/utils/image';

import {
  CreateBusinessForm,
  CreateBusinessSchema,
  ServicesForm,
  ServicesSchema,
} from '../business.helper';

const useHook = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateBusinessForm>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: {
      business: {
        businessType: '',
        name: '',
        description: '',
        logoUrl: '',
        primaryColor: '#000000',
        isActive: true,
      },
    },
  });

  const { handleSubmit, setValue } = form;

  const handleChangeImage = async (fileItems: FilePondFile[]) => {
    setImage({
      fileItems,
      setValue: form.setValue,
      name: 'business.logoUrl',
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
  });

  const handleCancel = () => {
    router.push('/users');
  };

  return {
    onSubmit,
    handleCancel,
    handleChangeImage,
    isLoading,
    form,
  };
};

const [useCreateBusiness, CreateBusinessProvider] = createAppContext(useHook);
export { useCreateBusiness, CreateBusinessProvider };
