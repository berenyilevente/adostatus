import { ReactElement } from 'react';
import { redirect } from 'next/navigation';

import { PageTitle } from '../components';
import { ClientsProvider } from './use-clients';
import { Clients } from './Clients';
import { getClients } from './actions/clients.actions';

const ClientsPage = async (): Promise<ReactElement> => {
  const response = await getClients();

  if (response.status === 'error' || !response.data) {
    redirect('/dashboard');
  }

  return (
    <div>
      <PageTitle
        title="Ügyfelek"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Ügyfelek', active: true },
        ]}
      />
      <ClientsProvider data={response.data}>
        <Clients />
      </ClientsProvider>
    </div>
  );
};

export default ClientsPage;
