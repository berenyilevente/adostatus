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
import { updateBusiness } from '../../actions/business.actions';
import { toast } from 'sonner';

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
      ownerId: business.ownerId ?? undefined,
    },
  });

  const handleChangeImage = (fileItems: FilePondFile[]) => {
    setImage({
      fileItems,
      setValue: businessForm.setValue,
      name: 'business.logoUrl',
    });
  };

  const onBusinessSave = businessForm.handleSubmit(async (data) => {
    if (!businessId) {
      return;
    }

    setIsLoading(true);
    const response = await updateBusiness(businessId.toString(), data);
    if (response.status === 'success') {
      toast.success('Business updated successfully');
      setIsLoading(false);
      return;
    }

    if (response.status === 'error') {
      setIsLoading(false);
      toast.error(response.error);
    }
  });

  const handleBack = () => {
    router.back();
  };

  return {
    businessForm,
    isLoading,
    onBusinessSave,
    handleBack,
    handleChangeImage,
  };
};

const [useEditBusiness, EditBusinessProvider] = createAppContext(useHook);
export { useEditBusiness, EditBusinessProvider };
