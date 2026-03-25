import { routes } from '@/lib/routes';
import { IMenuItem } from '../types/menu.types';

export const adminMenuItems: IMenuItem[] = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    url: routes.admin.dashboard.index,
  },
];
