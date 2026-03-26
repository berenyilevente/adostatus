'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createAppContext } from '@/hooks/use-create-app-context';
import { ClientDetail } from '../types/clients.types';
import { removeClient } from '../actions/clients.actions';
import { routes } from '@/lib/routes';

const useHook = ({ data }: { data: ClientDetail }) => {
  const [client] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onRemoveClient = async () => {
    setIsLoading(true);
    try {
      const result = await removeClient(client.id);
      if (result.status === 'success') {
        toast.success('Ügyfél eltávolítva');
        router.push(routes.admin.clients.index);
      } else {
        toast.error(result.error || 'Hiba történt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onNavigateToMonth = (year: number, month: number) => {
    router.push(routes.admin.clients.taxRecordMonth(client.id, year, month));
  };

  return { client, isLoading, onRemoveClient, onNavigateToMonth };
};

const [useClientDetail, ClientDetailProvider] = createAppContext(useHook);
export { useClientDetail, ClientDetailProvider };
