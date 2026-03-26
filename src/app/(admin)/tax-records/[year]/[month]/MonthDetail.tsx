'use client';

import { ReactElement } from 'react';
import { useMonthDetail } from './use-month-detail';
import { TaxItemRow } from './components/TaxItemRow';

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

export const MonthDetail = (): ReactElement => {
  const { record, userPaymentDetails } = useMonthDetail();
  const totalAmount = record.taxItems.reduce((sum, item) => sum + item.amount, 0);
  const paidAmount = record.taxItems
    .filter((item) => item.status === 'PAID')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between rounded-lg bg-muted p-4">
        <div>
          <p className="text-sm text-muted-foreground">Összesen fizetendő</p>
          <p className="text-2xl font-bold">{totalAmount.toLocaleString('hu-HU')} Ft</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Fizetve</p>
          <p className="text-2xl font-bold text-green-600">{paidAmount.toLocaleString('hu-HU')} Ft</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {record.taxItems.map((item) => (
          <TaxItemRow
            key={item.id}
            item={item}
            paymentDetail={userPaymentDetails.find((d) => d.taxTypeId === item.taxTypeId)}
          />
        ))}
      </div>
    </div>
  );
};
