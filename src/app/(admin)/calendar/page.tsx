import { CalendarProvider } from './use-calendar';
import { CalendarPage } from './CalendarPage';
import { PageTitle } from '../components';
import { getAppointments } from './actions/calendar.actions';
import { Business } from '@/generated/prisma';
import { notFound } from 'next/navigation';
import { getBusinesses } from '../business/actions';

export default async function Calendar(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const businessId = params.id;

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
      <PageTitle
        title={'Calendar'}
        breadcrumbs={[{ label: 'Calendar', active: true }]}
      />
      <CalendarPage />
    </CalendarProvider>
  );
}
