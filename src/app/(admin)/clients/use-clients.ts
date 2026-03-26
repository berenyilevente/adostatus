'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createAppContext } from '@/hooks/use-create-app-context';
import { ClientListItem } from './types/clients.types';
import { inviteClient, removeClient } from './actions/clients.actions';
import { InviteClientInput } from './schemas/clients.schemas';
import { routes } from '@/lib/routes';

const useHook = ({ data }: { data: ClientListItem[] }) => {
  const [clients, setClients] = useState(data);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onInviteClient = async (input: InviteClientInput) => {
    setIsLoading(true);
    try {
      const result = await inviteClient(input);
      if (result.status === 'success') {
        toast.success('Ügyfél sikeresen meghívva');
        setIsInviteOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || 'Hiba történt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRemoveClient = async (clientId: string) => {
    setIsLoading(true);
    try {
      const result = await removeClient(clientId);
      if (result.status === 'success') {
        setClients((prev) => prev.filter((c) => c.id !== clientId));
        toast.success('Ügyfél eltávolítva');
      } else {
        toast.error(result.error || 'Hiba történt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onNavigateToClient = (clientId: string) => {
    router.push(routes.admin.clients.detail(clientId));
  };

  return {
    clients,
    isInviteOpen,
    setIsInviteOpen,
    isLoading,
    onInviteClient,
    onRemoveClient,
    onNavigateToClient,
  };
};

const [useClients, ClientsProvider] = createAppContext(useHook);
export { useClients, ClientsProvider };
