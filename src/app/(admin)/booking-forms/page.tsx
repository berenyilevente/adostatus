import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageTitle } from '../components';
import { BookingForm, getBookingForms } from './actions';
import { BookingFormList } from './BookingFormList';
import { BookingFormsProvider } from './use-booking-forms';
import { Business } from '@/generated/prisma';
import { getBusinesses } from '../business/actions';
import { getServices, ServiceWithForm } from '../business-services/actions/business-services.actions';
import { CreateBookingFormProvider } from './create/use-create-booking-form';

export const metadata: Metadata = {
  title: 'Booking Forms',
};

const BookingForms = async () => {
  let bookingForms: BookingForm[] = [];
  let businesses: Business[] = [];
  let services: ServiceWithForm[] = [];

  const response = await Promise.all([
    getBookingForms(),
    getBusinesses(),
    getServices(),
  ]);

  if (response.some((r) => r.data === null)) {
    return notFound();
  }

  if (response.every((r) => r.status === 'success' && r.data !== null)) {
    bookingForms = response[0].data || [];
    businesses = response[1].data || [];
    services = response[2].data || [];
  }

  return (
    <BookingFormsProvider
      bookingForms={bookingForms}
      businesses={businesses}
      services={services}
    >
      <CreateBookingFormProvider>
        <PageTitle
          title={'Booking Forms'}
          breadcrumbs={[{ label: 'Booking Forms', active: true }]}
        />
        <div className="mt-5">
          <BookingFormList />
        </div>
      </CreateBookingFormProvider>
    </BookingFormsProvider>
  );
};

export default BookingForms;
