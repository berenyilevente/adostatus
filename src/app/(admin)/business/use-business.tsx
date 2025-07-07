'use client';

import { useForm } from 'react-hook-form';

import { Business } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { FilePondFile } from 'filepond';
import { setImage } from '@/utils/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBusinessForm, CreateBusinessSchema } from './business.helper';
import { useState } from 'react';
import { createBusiness } from './actions/business.actions';

type HookProp = {
  businessData: Business[];
};

const useHook = ({ businessData }: HookProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

  const filterForm = useForm({
    defaultValues: {
      search: '',
    },
  });

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
    await createBusiness(data);
    setIsLoading(false);
  });

  const handleCancel = () => {
    setIsCreateSheetOpen(false);
  };

  const search = filterForm.watch('search');

  return {
    businessData,
    search,
    filterForm,
    form,
    onSubmit,
    handleCancel,
    handleChangeImage,
    isLoading,
    isCreateSheetOpen,
    setIsCreateSheetOpen,
  };
};

const [useBusiness, BusinessProvider] = createAppContext(useHook);

export { useBusiness, BusinessProvider };
