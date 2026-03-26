'use client';

import { ReactElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Icon } from '@/components';
import { ClientDashboardData } from '../types/dashboard.types';
import { useDashboard } from '../use-dashboard';
import { TaxStatus } from '@/generated/prisma';
import { StatusBadge } from '../../tax-records/components/StatusBadge';

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

export const ClientDashboard = ({ data }: { data: ClientDashboardData }): ReactElement => {
  const { navigateToMonth } = useDashboard();

  return (
    <div className="space-y-6">
      {data.currentMonth ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Fizetendő összesen</p>
                <p className="text-2xl font-bold mt-1">
                  {data.currentMonth.totalDue.toLocaleString('hu-HU')} Ft
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Fizetve</p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {data.currentMonth.totalPaid.toLocaleString('hu-HU')} Ft
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Hátralék</p>
                <p className="text-2xl font-bold mt-1 text-red-600">
                  {(data.currentMonth.totalDue - data.currentMonth.totalPaid).toLocaleString('hu-HU')} Ft
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {data.currentMonth.year}. {MONTH_NAMES[data.currentMonth.month]} - Aktuális hónap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.currentMonth.taxItems.map((item) => (
                  <div
                    key={item.taxTypeCode}
                    className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted/50"
                    onClick={() => navigateToMonth(data.currentMonth!.year, data.currentMonth!.month)}
                  >
                    <div>
                      <p className="font-medium text-sm">{item.taxTypeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.amount.toLocaleString('hu-HU')} Ft
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon icon="calendar" size="lg" className="mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">Nincs aktuális havi bevallás</p>
            <p className="text-sm text-muted-foreground mt-1">
              A könyvelője még nem hozta létre az aktuális hónap adóbevallását.
            </p>
          </CardContent>
        </Card>
      )}

      {data.recentMonths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Korábbi hónapok</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.recentMonths.map((m) => (
                <div
                  key={`${m.year}-${m.month}`}
                  className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted/50"
                  onClick={() => navigateToMonth(m.year, m.month)}
                >
                  <p className="font-medium text-sm">
                    {m.year}. {MONTH_NAMES[m.month]}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{m.totalDue.toLocaleString('hu-HU')} Ft</span>
                    <span className="text-xs text-muted-foreground">
                      {m.paidCount}/{m.totalItems}
                    </span>
                    <Icon icon="chevronRight" size="xs" className="text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
