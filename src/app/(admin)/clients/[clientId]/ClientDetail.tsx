'use client';

import { ReactElement } from 'react';
import { Card, CardContent, Button, Icon } from '@/components';
import { useClientDetail } from './use-client-detail';
import { CreateTaxRecordDialog } from './components/CreateTaxRecordDialog';
import { TaxStatus } from '@/generated/prisma';

const STATUS_COLORS: Record<TaxStatus, string> = {
  NOT_PAID: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
};

const STATUS_LABELS: Record<TaxStatus, string> = {
  NOT_PAID: 'Nincs fizetve',
  PENDING: 'Folyamatban',
  PAID: 'Fizetve',
};

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

export const ClientDetail = (): ReactElement => {
  const { client, onRemoveClient, onNavigateToMonth, setIsCreateOpen, isLoading } = useClientDetail();

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                {client.lastName} {client.firstName}
              </h3>
              <p className="text-sm text-muted-foreground">{client.email}</p>
              {client.phone && (
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRemoveClient}
              disabled={isLoading}
              className="text-red-600 hover:text-red-700"
            >
              <Icon icon="trash" size="xs" />
              Eltávolítás
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Adóbevallások</h4>
          <Button size="sm" startIcon="plus" onClick={() => setIsCreateOpen(true)}>
            Bevallás létrehozása
          </Button>
        </div>
        {client.taxRecords.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nincsenek még adóbevallások ehhez az ügyfélhez.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {client.taxRecords.map((record) => {
              const totalAmount = record.taxItems.reduce((sum, i) => sum + i.amount, 0);
              const paidCount = record.taxItems.filter((i) => i.status === 'PAID').length;
              const totalItems = record.taxItems.length;

              return (
                <Card
                  key={record.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => onNavigateToMonth(record.year, record.month)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {record.year}. {MONTH_NAMES[record.month]}
                      </p>
                      <Icon icon="chevronRight" size="xs" className="text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {totalAmount.toLocaleString('hu-HU')} Ft
                    </p>
                    <div className="mt-2 flex gap-2">
                      {record.taxItems.map((item) => (
                        <span
                          key={item.id}
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status]}`}
                          title={`${item.taxType.code}: ${STATUS_LABELS[item.status]}`}
                        >
                          {item.taxType.code}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {paidCount}/{totalItems} fizetve
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <CreateTaxRecordDialog />
    </div>
  );
};
