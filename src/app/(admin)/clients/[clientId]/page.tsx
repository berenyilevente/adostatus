import { ReactElement } from 'react';
import { redirect } from 'next/navigation';

import { PageTitle } from '../../components';
import { ClientDetailProvider } from './use-client-detail';
import { ClientDetail } from './ClientDetail';
import { getClientDetail } from '../actions/clients.actions';

type PageProps = {
  params: Promise<{ clientId: string }>;
};

const ClientDetailPage = async ({ params }: PageProps): Promise<ReactElement> => {
  const { clientId } = await params;
  const response = await getClientDetail(clientId);

  if (response.status === 'error' || !response.data) {
    redirect('/clients');
  }

  const client = response.data;

  return (
    <div>
      <PageTitle
        title={`${client.lastName} ${client.firstName}`}
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Ügyfelek', path: '/clients' },
          { label: `${client.lastName} ${client.firstName}`, active: true },
        ]}
      />
      <ClientDetailProvider data={client}>
        <ClientDetail />
      </ClientDetailProvider>
    </div>
  );
};

export default ClientDetailPage;
