import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import { routes } from '@/lib/routes';

import { EditBusiness } from './EditBusiness';
import { EditBusinessProvider } from './use-edit-business';
import { getBusiness, getServices } from '../../actions/business.actions';
import { PageTitle } from '../../../components';
import { Business, Service } from '@/generated/prisma';
import { BusinessServicesProvider } from '@/app/(admin)/business-services/use-business-services';
import { BusinessServicesDialog } from '@/app/(admin)/business-services/BusinessServicesDialog';

export const metadata: Metadata = {
  title: 'Edit Business',
};

const EditBusinessPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  let business: Business | null = null;
  const rBusiness = await getBusiness(params.id);

  if (rBusiness.status === 'success' && rBusiness.data) {
    business = rBusiness.data;
  } else {
    notFound();
  }

  return (
    <div>
      <PageTitle
        title={'Edit Business'}
        breadcrumbs={[
          { label: 'Business', path: routes.admin.business.index },
          { label: 'Details', path: `/business/show/${business.id}` },
          { label: 'Edit', active: true },
        ]}
      />
      <div className="mt-5">
        <EditBusinessProvider business={business}>
          <EditBusiness />
        </EditBusinessProvider>
      </div>
    </div>
  );
};

export default EditBusinessPage;
