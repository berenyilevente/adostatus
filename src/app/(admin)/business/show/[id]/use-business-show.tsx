'use client';

import { useParams, useRouter } from 'next/navigation';

import { createAppContext } from '@/hooks/use-create-app-context';

import { BusinessResponse } from '../../actions/business.actions';
import { businessTypes } from '../../business.helper';

import { useState } from 'react';

type HookProp = {
  business: BusinessResponse;
};

const useHook = ({ business }: HookProp) => {
  const router = useRouter();
  const { id: businessId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    router.back();
  };

  const getBusinessTypeLabel = (type: string | null) => {
    if (!type) {
      return 'Not specified';
    }
    const found = businessTypes.find((t) => t.value === type);

    return found ? found.label : type;
  };

  return {
    business,
    isLoading,
    handleCancel,
    getBusinessTypeLabel,
  };
};

const [useBusinessShow, BusinessShowProvider] = createAppContext(useHook);
export { useBusinessShow, BusinessShowProvider };
