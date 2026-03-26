import { ReactElement } from 'react';
import { redirect } from 'next/navigation';

import { PageTitle } from '../components';
import { TaxRecordsProvider } from './use-tax-records';
import { TaxRecords } from './TaxRecords';
import { getTaxRecords } from './actions/tax-records.actions';

const TaxRecordsPage = async (): Promise<ReactElement> => {
  const response = await getTaxRecords();

  if (response.status === 'error' || !response.data) {
    redirect('/dashboard');
  }

  return (
    <div>
      <PageTitle
        title="Adóbevallások"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Adóbevallások', active: true },
        ]}
      />
      <TaxRecordsProvider data={response.data}>
        <TaxRecords />
      </TaxRecordsProvider>
    </div>
  );
};

export default TaxRecordsPage;
