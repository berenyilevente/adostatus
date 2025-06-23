import { Metadata } from 'next';
import React from 'react';

import { routes } from '@/lib/routes';

import { CreateBusiness } from './CreateBusiness';
import { CreateBusinessProvider } from './use-create-business';
import { PageTitle } from '../../components';

export const metadata: Metadata = {
  title: 'Create Business',
};

const CreateUserPage = () => {
  return (
    <div>
      <PageTitle
        title={'Create Business'}
        breadcrumbs={[
          { label: 'Businesses', path: routes.admin.business.index },
          { label: 'Create', active: true },
        ]}
      />
      <div className="mt-5">
        <CreateBusinessProvider>
          <CreateBusiness />
        </CreateBusinessProvider>
      </div>
    </div>
  );
};

export default CreateUserPage;
