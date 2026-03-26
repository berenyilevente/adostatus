'use client';

import { Card, CardContent, Icon } from '@/components';
import { TaxRecordListItem } from '../types/tax-records.types';
import { useTaxRecords } from '../use-tax-records';
import { StatusBadge } from './StatusBadge';

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

export const TaxRecordCard = ({ record }: { record: TaxRecordListItem }) => {
  const { onNavigateToMonth } = useTaxRecords();
  const totalAmount = record.taxItems.reduce((sum, i) => sum + i.amount, 0);
  const paidCount = record.taxItems.filter((i) => i.status === 'PAID').length;

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => onNavigateToMonth(record.year, record.month)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-base">
              {record.year}. {MONTH_NAMES[record.month]}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {totalAmount.toLocaleString('hu-HU')} Ft
            </p>
          </div>
          <Icon icon="chevronRight" size="sm" className="text-muted-foreground" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {record.taxItems.map((item) => (
            <div key={item.id} className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{item.taxType.code}:</span>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {paidCount}/{record.taxItems.length} fizetve
        </p>
      </CardContent>
    </Card>
  );
};
