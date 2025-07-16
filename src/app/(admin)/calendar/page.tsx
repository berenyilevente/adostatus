import { CalendarProvider } from './use-calendar';
import { CalendarPage } from './CalendarPage';
import { PageTitle } from '../components';
import { getAppointments } from './actions/calendar.actions';
import { Appointment, Business } from '@/generated/prisma';
import { notFound } from 'next/navigation';
import { getBusinesses } from '../business/actions';
import { BusinessHoursProvider } from '../business-hours/use-business-hours';
import { BusinessHours } from '../business-hours/BusinessHoursDialog';
import {
  getBreakTimes,
  getBusinessHours,
} from '../business-hours/actions/business-hours.actions';

export default async function Calendar() {
  let businesses: Business[] = [];
  let appointments: Appointment[] = [];
  const rBusinesses = await getBusinesses();

  if (rBusinesses === null) {
    return notFound();
  }

  if (rBusinesses.status === 'success' && rBusinesses.data) {
    businesses = rBusinesses.data;
  }

  const businessIds = businesses.map((business) => business.id) || [];

  const rAppointments = await getAppointments(businessIds);

  if (rAppointments === null) {
    return notFound();
  }

  if (rAppointments.status === 'success' && rAppointments.data) {
    appointments = rAppointments.data;
  }

  return (
    <CalendarProvider businesses={businesses}>
      <BusinessHoursProvider businesses={businesses}>
        <PageTitle
          title={'Calendar'}
          breadcrumbs={[{ label: 'Calendar', active: true }]}
        />
        <CalendarPage />
        <BusinessHours />
      </BusinessHoursProvider>
    </CalendarProvider>
  );
}
