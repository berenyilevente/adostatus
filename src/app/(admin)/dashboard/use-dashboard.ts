'use client';

import { useRouter } from 'next/navigation';
import { createAppContext } from '@/hooks/use-create-app-context';
import { DashboardData } from './types/dashboard.types';
import { routes } from '@/lib/routes';

const useHook = ({ data }: { data: DashboardData }) => {
  const router = useRouter();

  const navigateToMonth = (year: number, month: number) => {
    router.push(routes.admin.taxRecords.month(year, month));
  };

  const navigateToClient = (clientId: string) => {
    router.push(routes.admin.clients.detail(clientId));
  };

  const navigateToClientMonth = (clientId: string, year: number, month: number) => {
    router.push(routes.admin.clients.taxRecordMonth(clientId, year, month));
  };

  return { data, navigateToMonth, navigateToClient, navigateToClientMonth };
};

const [useDashboard, DashboardProvider] = createAppContext(useHook);
export { useDashboard, DashboardProvider };
