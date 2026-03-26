'use client';

import { ReactElement } from 'react';
import { useTaxRecords } from './use-tax-records';
import { TaxRecordCard } from './components/TaxRecordCard';
import { EmptyList } from '../components/ui/empty-list';

export const TaxRecords = (): ReactElement => {
  const { records } = useTaxRecords();

  return (
    <div className="mt-6 space-y-4">
      {records.length === 0 ? (
        <EmptyList>
          <EmptyList.Icon icon="receipt" />
          <EmptyList.Title title="Nincsenek adóbevallások" />
          <EmptyList.Description description="A könyvelője még nem hozta létre az adóbevallásait." />
        </EmptyList>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <TaxRecordCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
};
