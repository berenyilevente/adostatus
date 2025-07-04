import type { Metadata } from 'next';

import { PageTitle } from '../../components';
import { CreateBookingFormProvider } from './use-create-booking-form';
import { FormBuilder } from './CreateBookingForm';
import { routes } from '@/lib/routes';
import { getBusinesses } from '../../business/actions/business.actions';
import { notFound } from 'next/navigation';
import { getBookingForms } from '../actions';
import { Business } from '@/generated/prisma';

export const metadata: Metadata = {
  title: 'Forms',
};

const CreateBookingFormPage = async () => {
  let businessData: Business[] = [];
  const rBusiness = await getBusinesses();

  if (rBusiness.data === null) {
    return notFound();
  }

  if (rBusiness.status === 'success' && rBusiness.data) {
    businessData = rBusiness.data;
  }

  return (
    <CreateBookingFormProvider formsData={[]} businessData={businessData}>
      <PageTitle
        title={'Create Booking Form'}
        breadcrumbs={[
          { label: 'Booking Forms', path: routes.admin.bookingForms.index },
          { label: 'Create Booking Form', active: true },
        ]}
      />
      <div className="mt-5">
        <FormBuilder />
      </div>
    </CreateBookingFormProvider>
  );
};

export default CreateBookingFormPage;
