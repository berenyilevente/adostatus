import type { Metadata } from 'next';

import { PageTitle } from '../../components';
import { EditBookingFormProvider } from './use-edit-booking-form';
import { EditBookingForm } from './EditBookingForm';
import { routes } from '@/lib/routes';
import { getBusinesses } from '../../business/actions/business.actions';
import { notFound } from 'next/navigation';
import { getForm } from '../actions';
import { Business, Form } from '@/generated/prisma';

export const metadata: Metadata = {
  title: 'Forms',
};

const CreateBookingFormPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;

  let businessData: Business[] = [];
  let formData: Form | null = null;

  const rBusiness = await getBusinesses();
  const rForm = await getForm(params.id);

  if (rBusiness.data === null) {
    return notFound();
  }

  if (rBusiness.status === 'success' && rBusiness.data) {
    businessData = rBusiness.data;
  }

  if (rForm.status === 'success' && rForm.data) {
    formData = rForm.data;
  }

  return (
    <EditBookingFormProvider formsData={formData} businessData={businessData}>
      <PageTitle
        title="Form Editor"
        breadcrumbs={[
          { label: 'Booking Forms', path: routes.admin.bookingForms.index },
          { label: 'Form editor', active: true },
        ]}
      />
      <div className="mt-5">
        <EditBookingForm />
      </div>
    </EditBookingFormProvider>
  );
};

export default CreateBookingFormPage;
