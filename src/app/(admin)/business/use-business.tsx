'use client';

import { useForm } from 'react-hook-form';

import { Business } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';

type HookProp = {
  businessData: Business[];
};

const useHook = ({ businessData }: HookProp) => {
  const filterForm = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { watch } = filterForm;

  const search = watch('search');

  return {
    businessData,
    search,
    filterForm,
  };
};

const [useBusiness, BusinessProvider] = createAppContext(useHook);

export { useBusiness, BusinessProvider };
