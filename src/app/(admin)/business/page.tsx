import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Business as BusinessType } from '@/generated/prisma';

import { UserTable } from './BusinessTable';
import { BusinessProvider } from './use-business';
import { getBusinesses } from './actions';
import { PageTitle } from '../components';

export const metadata: Metadata = {
  title: 'Business',
};

const Business = async () => {
  let business: BusinessType[] = [];
  const rBusiness = await getBusinesses();

  if (rBusiness === null) {
    return notFound();
  }

  if (rBusiness.status === 'success' && rBusiness.data) {
    business = rBusiness.data;
  }

  return (
    <BusinessProvider businessData={business}>
      <PageTitle
        title={'Business'}
        breadcrumbs={[{ label: 'Business', active: true }]}
      />
      <div className="mt-5">
        <UserTable />
      </div>
    </BusinessProvider>
  );
};

export default Business;
