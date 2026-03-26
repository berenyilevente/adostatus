'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAppContext } from '@/hooks/use-create-app-context';
import { TaxRecordListItem } from './types/tax-records.types';
import { routes } from '@/lib/routes';

const useHook = ({ data }: { data: TaxRecordListItem[] }) => {
  const [records] = useState(data);
  const router = useRouter();

  const onNavigateToMonth = (year: number, month: number) => {
    router.push(routes.admin.taxRecords.month(year, month));
  };

  return { records, onNavigateToMonth };
};

const [useTaxRecords, TaxRecordsProvider] = createAppContext(useHook);
export { useTaxRecords, TaxRecordsProvider };
