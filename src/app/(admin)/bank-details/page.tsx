import { ReactElement } from 'react';

import { PageTitle } from '../components';
import { BankDetailsProvider } from './use-bank-details';
import { BankDetails } from './BankDetails';
import { getBankDetailsPageData } from './actions/bank-details.actions';
import { redirect } from 'next/navigation';

const BankDetailsPage = async (): Promise<ReactElement> => {
  const response = await getBankDetailsPageData();

  if (response.status === 'error' || !response.data) {
    redirect('/dashboard');
  }

  return (
    <div>
      <PageTitle
        title="Bankadatok"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Bankadatok', active: true },
        ]}
      />
      <BankDetailsProvider data={response.data}>
        <BankDetails />
      </BankDetailsProvider>
    </div>
  );
};

export default BankDetailsPage;
