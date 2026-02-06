import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Business as BusinessType } from '@/generated/prisma';

import { BusinessList } from './BusinessList';
import { BusinessProvider } from './use-business';
import { getBusinesses } from './actions';
import { PageTitle } from '../components';
import { CreateBusinessProvider } from './create/use-create-business';

export const metadata: Metadata = {
  title: 'Business',
};

const Business = async () => {
  let businesses: BusinessType[] = [];
  const rBusinesses = await getBusinesses();

  if (rBusinesses === null) {
    return notFound();
  }

  if (rBusinesses.status === 'success' && rBusinesses.data) {
    businesses = rBusinesses.data;
  }

  return (
    <BusinessProvider businesses={businesses}>
      <CreateBusinessProvider>
        <PageTitle
          title={'Business'}
          breadcrumbs={[{ label: 'Business', active: true }]}
        />
        <div className="mt-5">
          <BusinessList />
        </div>
      </CreateBusinessProvider>
    </BusinessProvider>
  );
};

export default Business;
