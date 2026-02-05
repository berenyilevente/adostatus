import { Appointment, Business, FormSubmission } from '@/generated/prisma';
import { notFound } from 'next/navigation';
import { BusinessHoursDialog } from '../business-hours/BusinessHoursDialog';
import { BusinessHoursProvider } from '../business-hours/use-business-hours';
import { getBusinesses } from '../business/actions';
import { PageTitle } from '../components';
import { CalendarPage } from './CalendarPage';

import { CalendarProvider } from './use-calendar';

export default async function Calendar() {
  let businesses: Business[] = [];

  const rBusinesses = await getBusinesses();

  if (rBusinesses === null) {
    return notFound();
  }

  if (rBusinesses.status === 'success' && rBusinesses.data) {
    businesses = rBusinesses.data;
  }

  return (
    <CalendarProvider businesses={businesses}>
      <BusinessHoursProvider businesses={businesses}>
        <PageTitle
          title={'Calendar'}
          breadcrumbs={[{ label: 'Calendar', active: true }]}
        />
        <CalendarPage />
        <BusinessHoursDialog />
      </BusinessHoursProvider>
    </CalendarProvider>
  );
}
