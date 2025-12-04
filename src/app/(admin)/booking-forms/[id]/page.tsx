import type { Metadata } from 'next';

import { Form } from '@/generated/prisma';
import { routes } from '@/lib/routes';
import { PageTitle } from '../../components';
import { getForm } from '../actions';
import { EditBookingForm } from './EditBookingForm';
import { EditBookingFormProvider } from './use-edit-booking-form';

export const metadata: Metadata = {
  title: 'Forms',
};

const CreateBookingFormPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const formId = params.id;

  let formData: Form | null = null;

  const rForm = await getForm(formId);

  if (rForm.status === 'success' && rForm.data) {
    formData = rForm.data;
  }

  return (
    <EditBookingFormProvider formData={formData}>
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
