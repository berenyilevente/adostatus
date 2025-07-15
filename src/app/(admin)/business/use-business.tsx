'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Business } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { deleteBusiness } from './actions/business.actions';
import { toast } from 'sonner';

type HookProp = {
  businesses: Business[];
};

const useHook = ({ businesses }: HookProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );

  const openDeleteDialog = (id: string) => {
    setIsDeleteDialogOpen(true);
    setSelectedBusinessId(id);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedBusinessId(null);
  };

  const confirmDelete = async () => {
    if (!selectedBusinessId) {
      return;
    }

    setIsDeleteDialogOpen(false);
    setSelectedBusinessId(null);

    const res = await deleteBusiness(selectedBusinessId);
    if (res.status === 'error') {
      toast.error(res.error);
      return;
    }

    if (res.status === 'success') {
      toast.success('Business deleted successfully');
    }
  };

  const filterForm = useForm({
    defaultValues: {
      search: '',
    },
  });

  const search = filterForm.watch('search');

  return {
    businesses,
    search,
    filterForm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedBusinessId,
    setSelectedBusinessId,
    isLoading,
    cancelDelete,
    confirmDelete,
    openDeleteDialog,
  };
};

const [useBusiness, BusinessProvider] = createAppContext(useHook);

export { useBusiness, BusinessProvider };
