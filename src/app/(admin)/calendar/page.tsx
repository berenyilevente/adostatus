import { Appointment, Business, FormSubmission } from '@/generated/prisma';
import { notFound } from 'next/navigation';
import { BusinessHours } from '../business-hours/BusinessHoursDialog';
import { BusinessHoursProvider } from '../business-hours/use-business-hours';
import { getBusinesses } from '../business/actions';
import { PageTitle } from '../components';
import { CalendarPage } from './CalendarPage';
import {
  getAppointments,
  getFormSubmissions,
} from './actions/calendar.actions';
import { CalendarProvider } from './use-calendar';

export default async function Calendar() {
  let businesses: Business[] = [];
  let appointments: Appointment[] = [];
  let formSubmissions: FormSubmission[] = [];
  const rBusinesses = await getBusinesses();
  const rFormSubmissions = await getFormSubmissions();

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

  if (rFormSubmissions.status === 'success' && rFormSubmissions.data) {
    formSubmissions = rFormSubmissions.data;
  }

  return (
    <CalendarProvider businesses={businesses} formSubmissions={formSubmissions}>
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
