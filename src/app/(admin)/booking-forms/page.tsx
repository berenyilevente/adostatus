import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Business, Form } from '@/generated/prisma';

import { getBusinesses } from '../business/actions/business.actions';
import { PageTitle } from '../components';
import { getBookingForms } from './actions';
import { BookingFormList } from './BookingFormList';
import { BookingFormsProvider } from './use-booking-forms';

export const metadata: Metadata = {
  title: 'Booking Forms',
};

const BookingForms = async () => {
  let bookingForms: Form[] = [];
  let businessData: Business[] = [];
  const rBookingForms = await getBookingForms();
  const rBusiness = await getBusinesses();

  if (rBookingForms === null || rBusiness.data === null) {
    return notFound();
  }

  if (rBookingForms.status === 'success' && rBookingForms.data) {
    bookingForms = rBookingForms.data;
  }

  if (rBusiness.status === 'success' && rBusiness.data) {
    businessData = rBusiness.data;
  }

  return (
    <BookingFormsProvider
      bookingForms={bookingForms}
      businessData={businessData}
    >
      <PageTitle
        title={'Booking Forms'}
        breadcrumbs={[{ label: 'Booking Forms', active: true }]}
      />
      <div className="mt-5">
        <BookingFormList />
      </div>
    </BookingFormsProvider>
  );
};

export default BookingForms;
