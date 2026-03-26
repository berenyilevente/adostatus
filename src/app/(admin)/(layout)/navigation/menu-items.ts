import { routes } from '@/lib/routes';
import { IMenuItem } from '../types/menu.types';

export const clientMenuItems: IMenuItem[] = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    url: routes.admin.dashboard.index,
  },
  {
    key: 'tax-records',
    icon: 'receipt',
    label: 'Adóbevallások',
    url: routes.admin.taxRecords.index,
  },
];

export const accountantMenuItems: IMenuItem[] = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    url: routes.admin.dashboard.index,
  },
  {
    key: 'clients',
    icon: 'users',
    label: 'Ügyfelek',
    url: routes.admin.clients.index,
  },
  {
    key: 'bank-details',
    icon: 'landmark',
    label: 'Bankadatok',
    url: routes.admin.bankDetails.index,
  },
];

export const adminMenuItems = clientMenuItems;
