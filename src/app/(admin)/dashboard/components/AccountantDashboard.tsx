'use client';

import { ReactElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Icon } from '@/components';
import { AccountantDashboardData } from '../types/dashboard.types';
import { useDashboard } from '../use-dashboard';
import { TaxStatus } from '@/generated/prisma';

const STATUS_COLORS: Record<TaxStatus, string> = {
  NOT_PAID: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
};

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

export const AccountantDashboard = ({ data }: { data: AccountantDashboardData }): ReactElement => {
  const { navigateToClient, navigateToClientMonth } = useDashboard();
  const { year, month } = data.currentMonth;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ügyfelek</p>
            <p className="text-2xl font-bold mt-1">{data.clientCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Fizetve</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{data.statusOverview.paidCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Folyamatban</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">{data.statusOverview.pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Nincs fizetve</p>
            <p className="text-2xl font-bold mt-1 text-red-600">{data.statusOverview.unpaidCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {year}. {MONTH_NAMES[month]} - Ügyfelek áttekintése
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.clients.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Nincsenek még ügyfelek. Hívjon meg ügyfeleket az Ügyfelek menüpontban.
            </p>
          ) : (
            <div className="space-y-3">
              {data.clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigateToClient(client.id)}
                  >
                    <p className="font-medium text-sm">
                      {client.lastName} {client.firstName}
                    </p>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                  </div>

                  {client.hasCurrentMonthRecord ? (
                    <div className="flex items-center gap-2">
                      {client.taxItems.map((item) => (
                        <span
                          key={item.taxTypeCode}
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status]}`}
                          title={`${item.taxTypeName}: ${item.amount.toLocaleString('hu-HU')} Ft`}
                        >
                          {item.taxTypeCode}
                        </span>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateToClientMonth(client.id, year, month)}
                      >
                        <Icon icon="pencil" size="xs" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToClientMonth(client.id, year, month)}
                    >
                      <Icon icon="plus" size="xs" />
                      Bevallás létrehozása
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
