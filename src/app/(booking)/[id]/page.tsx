import { PublicBookingForm } from './PublicBookingForm';
import { findBookingForm } from '../actions/booking.actions';
import { BookingProvider } from './use-booking';
import { vw_forms_public } from '@/generated/prisma';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rform = await findBookingForm(id);

  if (rform.status === 'error') {
    return <div>Error: {rform.error}</div>;
  }

  return (
    <BookingProvider vwForm={rform.data as vw_forms_public}>
      <div className="max-w-2xl mx-auto mt-16">
        <PublicBookingForm />
      </div>
    </BookingProvider>
  );
}
