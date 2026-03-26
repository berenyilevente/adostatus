import { ReactElement } from 'react';
import { redirect } from 'next/navigation';

import { PageTitle } from '@/app/(admin)/components';
import { MonthDetailProvider } from './use-month-detail';
import { MonthDetail } from './MonthDetail';
import { getTaxRecordDetail } from '../../actions/tax-records.actions';
import { isAuthenticated } from '@/lib/auth/isAuthenticated';

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

type PageProps = {
  params: Promise<{ year: string; month: string }>;
};

const MonthDetailPage = async ({ params }: PageProps): Promise<ReactElement> => {
  const { year: yearStr, month: monthStr } = await params;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    redirect('/tax-records');
  }

  const { user } = await isAuthenticated();
  const response = await getTaxRecordDetail(user.id, year, month);

  if (response.status === 'error' || !response.data) {
    redirect('/tax-records');
  }

  return (
    <div>
      <PageTitle
        title={`${year}. ${MONTH_NAMES[month]}`}
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Adóbevallások', path: '/tax-records' },
          { label: `${year}. ${MONTH_NAMES[month]}`, active: true },
        ]}
      />
      <MonthDetailProvider data={response.data}>
        <MonthDetail />
      </MonthDetailProvider>
    </div>
  );
};

export default MonthDetailPage;
