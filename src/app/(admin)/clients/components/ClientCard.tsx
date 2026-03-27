'use client';

import { Card, CardContent, Icon, Button, Badge } from '@/components';
import { ClientListItem } from '../types/clients.types';
import { useClients } from '../use-clients';
import { TaxStatus } from '@/generated/prisma';

const STATUS_COLORS: Record<TaxStatus, string> = {
  NOT_PAID: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  DISMISSED: 'bg-gray-100 text-gray-800',
};

const STATUS_LABELS: Record<TaxStatus, string> = {
  NOT_PAID: 'Nincs fizetve',
  PENDING: 'Folyamatban',
  PAID: 'Fizetve',
  DISMISSED: 'Elvetett',
};

export const ClientCard = ({ client }: { client: ClientListItem }) => {
  const { onNavigateToClient } = useClients();
  const record = client.currentMonthRecord;

  const statusSummary = record?.taxItems.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => onNavigateToClient(client.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              {client.lastName} {client.firstName}
            </p>
            <p className="text-sm text-muted-foreground">{client.email}</p>
          </div>
          <Icon icon="chevronRight" size="sm" className="text-muted-foreground" />
        </div>
        {record ? (
          <div className="mt-3 flex gap-2">
            {Object.entries(statusSummary || {}).map(([status, count]) => (
              <span
                key={status}
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[status as TaxStatus]}`}
              >
                {count}x {STATUS_LABELS[status as TaxStatus]}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground italic">
            Nincs aktuális havi adóbevallás
          </p>
        )}
      </CardContent>
    </Card>
  );
};
