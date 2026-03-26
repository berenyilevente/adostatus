'use client';

import { ReactElement } from 'react';
import { useEditMonth } from './use-edit-month';
import { EditTaxItemForm } from './components/EditTaxItemForm';

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

export const EditMonthDetail = (): ReactElement => {
  const { record, userPaymentDetails } = useEditMonth();
  const totalAmount = record.taxItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {record.year}. {MONTH_NAMES[record.month]} - Összesen:{' '}
          <span className="font-semibold text-foreground">
            {totalAmount.toLocaleString('hu-HU')} Ft
          </span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {record.taxItems.map((item) => (
          <EditTaxItemForm
            key={item.id}
            item={item}
            paymentDetail={userPaymentDetails.find((d) => d.taxTypeId === item.taxTypeId)}
          />
        ))}
      </div>
    </div>
  );
};
