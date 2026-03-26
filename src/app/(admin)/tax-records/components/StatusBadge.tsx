'use client';

import { TaxStatus } from '@/generated/prisma';

const STATUS_CONFIG: Record<TaxStatus, { label: string; color: string }> = {
  NOT_PAID: { label: 'Nincs fizetve', color: 'bg-red-100 text-red-800 border-red-200' },
  PENDING: { label: 'Folyamatban', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  PAID: { label: 'Fizetve', color: 'bg-green-100 text-green-800 border-green-200' },
};

export const StatusBadge = ({ status }: { status: TaxStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};
