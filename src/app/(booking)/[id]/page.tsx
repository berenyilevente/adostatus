import { FormElementInstance } from '@/app/(admin)/booking-forms/[id]/components/FormElements';
import { PublicBookingForm } from './PublicBookingForm';
import { findBookingForm } from '../actions/booking.actions';
import { PageTitle } from '@/app/(admin)/components';
import { BookingProvider } from './use-booking';

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const { id } = await params;
  const form = await findBookingForm(id);

  const formFields: FormElementInstance[] = form.data
    ?.content as FormElementInstance[];

  return (
    <BookingProvider formFields={formFields} formId={id}>
      <div className="max-w-2xl mx-auto mt-16">
        <PageTitle title="Booking Form" />
        <PublicBookingForm />
      </div>
    </BookingProvider>
  );
}
