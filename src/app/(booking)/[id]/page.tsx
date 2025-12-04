import { PublicBookingForm } from './PublicBookingForm';
import { findBookingForm } from '../actions/booking.actions';
import { PageTitle } from '@/app/(admin)/components';
import { BookingProvider } from './use-booking';
import { VwFormsPublic } from '@/generated/prisma';

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const { id } = await params;
  const rform = await findBookingForm(id);

  if (rform.status === 'error') {
    return <div>Error: {rform.error}</div>;
  }

  return (
    <BookingProvider vwForm={rform.data as VwFormsPublic}>
      <div className="max-w-2xl mx-auto mt-16">
        <PublicBookingForm />
      </div>
    </BookingProvider>
  );
}
