'use client';

import { ReactElement } from 'react';
import { useDashboard } from './use-dashboard';
import { ClientDashboard } from './components/ClientDashboard';
import { AccountantDashboard } from './components/AccountantDashboard';
import { ClientDashboardData, AccountantDashboardData } from './types/dashboard.types';

export const Dashboard = (): ReactElement => {
  const { data } = useDashboard();

  if (data.role === 'CLIENT') {
    return <ClientDashboard data={data as ClientDashboardData} />;
  }

  return <AccountantDashboard data={data as AccountantDashboardData} />;
};
