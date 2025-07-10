'use client';

import { FilePondFile } from 'filepond';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { createAppContext } from '@/hooks/use-create-app-context';
import { setImage } from '@/utils/image';

import { CreateBusinessForm, CreateBusinessSchema } from '../business.helper';
import { createBusiness } from '../actions/business.actions';

const useHook = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateBusinessForm>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: {
      business: {
        ownerId: '',
        businessType: '',
        name: '',
        description: '',
        logoUrl: '',
        primaryColor: '#000000',
        isActive: true,
      },
      businessHours: {
        businessId: '',
      },
      breakTimes: {
        businessId: '',
      },
    },
  });

  const handleChangeImage = async (fileItems: FilePondFile[]) => {
    setImage({
      fileItems,
      setValue: form.setValue,
      name: 'business.logoUrl',
    });
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    const res = await createBusiness(data);

    if (res.status === 'success') {
      toast.success('Business created successfully');
      router.push(`/business/show/${res.data?.id}`);
      setIsLoading(false);
      return;
    }

    if (res.status === 'error') {
      toast.error('Failed to create business');
      setIsLoading(false);
      return;
    }
  });

  const handleCancel = () => {
    router.push('/business');
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
