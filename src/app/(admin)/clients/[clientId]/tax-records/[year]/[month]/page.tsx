import { ReactElement } from 'react';
import { redirect } from 'next/navigation';

import { PageTitle } from '@/app/(admin)/components';
import { EditMonthProvider } from './use-edit-month';
import { EditMonthDetail } from './EditMonthDetail';
import { getTaxRecordDetail } from '@/app/(admin)/tax-records/actions/tax-records.actions';

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

type PageProps = {
  params: Promise<{ clientId: string; year: string; month: string }>;
};

const EditMonthPage = async ({ params }: PageProps): Promise<ReactElement> => {
  const { clientId, year: yearStr, month: monthStr } = await params;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    redirect(`/clients/${clientId}`);
  }

  const response = await getTaxRecordDetail(clientId, year, month);

  if (response.status === 'error' || !response.data) {
    redirect(`/clients/${clientId}`);
  }

  return (
    <div>
      <PageTitle
        title={`${year}. ${MONTH_NAMES[month]}`}
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Ügyfelek', path: '/clients' },
          { label: 'Ügyfél', path: `/clients/${clientId}` },
          { label: `${year}. ${MONTH_NAMES[month]}`, active: true },
        ]}
      />
      <EditMonthProvider data={response.data} clientId={clientId}>
        <EditMonthDetail />
      </EditMonthProvider>
    </div>
  );
};

export default EditMonthPage;
