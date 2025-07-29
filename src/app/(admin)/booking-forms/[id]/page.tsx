import type { Metadata } from 'next';

import { PageTitle } from '../../components';
import { EditBookingFormProvider } from './use-edit-booking-form';
import { EditBookingForm } from './EditBookingForm';
import { routes } from '@/lib/routes';
import { getBusinesses } from '../../business/actions/business.actions';
import { notFound } from 'next/navigation';
import { getForm, getFormFields } from '../actions';
import { Business, Form, FormField } from '@/generated/prisma';

export const metadata: Metadata = {
  title: 'Forms',
};

const CreateBookingFormPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const formId = params.id;

  let formData: Form | null = null;
  let formFields: FormField[] = [];

  const rForm = await getForm(formId);
  const rFormFields = await getFormFields(formId);

  if (rForm.status === 'success' && rForm.data) {
    formData = rForm.data;
  }

  if (rFormFields.status === 'success' && rFormFields.data) {
    formFields = rFormFields.data;
  }

  return (
    <EditBookingFormProvider formsData={formData} formFields={formFields}>
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
