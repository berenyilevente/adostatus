'use client';

import { ReactElement } from 'react';
import { Button } from '@/components';
import { useClients } from './use-clients';
import { ClientCard } from './components/ClientCard';
import { InviteClientDialog } from './components/InviteClientDialog';
import { EmptyList } from '../components/ui/empty-list';

export const Clients = (): ReactElement => {
  const { clients, setIsInviteOpen } = useClients();

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsInviteOpen(true)} startIcon="plus" size="sm">
          Új ügyfél
        </Button>
      </div>

      {clients.length === 0 ? (
        <EmptyList>
          <EmptyList.Icon icon="users" />
          <EmptyList.Title title="Nincsenek ügyfelek" />
          <EmptyList.Description description="Hívja meg első ügyfelét az alkalmazás használatához." />
          <EmptyList.Action label="Ügyfél meghívása" onClick={() => setIsInviteOpen(true)} />
        </EmptyList>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}

      <InviteClientDialog />
    </div>
  );
};
