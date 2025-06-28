'use client';

import { FilePondFile } from 'filepond';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { createAppContext } from '@/hooks/use-create-app-context';
import { setImage } from '@/utils/image';

import { BusinessForm, BusinessSchema } from '../business.helper';
// import { createBusiness } from '../actions/business.actions';

const useHook = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BusinessForm>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      businessType: '',
      name: '',
      description: '',
      logoUrl: '',
      primaryColor: '#000000',
      isActive: true,
    },
  });

  const businessTypes = [
    { value: 'salon', label: 'Salon & Beauty' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'fitness', label: 'Fitness & Training' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'education', label: 'Education & Tutoring' },
    { value: 'other', label: 'Other' },
  ];

  const { handleSubmit, setValue } = form;

  const handleChangeImage = async (fileItems: FilePondFile[]) => {
    setImage(fileItems, setValue);
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
    businessTypes,
  };
};

const [useCreateBusiness, CreateBusinessProvider] = createAppContext(useHook);
export { useCreateBusiness, CreateBusinessProvider };
