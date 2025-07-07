'use client';

import { useRouter } from 'next/navigation';

import { createAppContext } from '@/hooks/use-create-app-context';

import { Service } from '@/generated/prisma';
import { BusinessResponse } from '../../actions/business.actions';

type HookProp = {
  business: BusinessResponse;
  services: Service[];
};

const useHook = ({ business, services }: HookProp) => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return {
    handleCancel,
    business,
    services,
  };
};

const [useShowBusiness, ShowBusinessProvider] = createAppContext(useHook);
export { useShowBusiness, ShowBusinessProvider };
