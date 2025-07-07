import { routes } from '@/lib/routes';
import { IMenuItem } from '../types/menu.types';

export const adminMenuItems: IMenuItem[] = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    url: routes.admin.dashboard.index,
  },
  {
    key: 'business',
    icon: 'business',
    label: 'Business',
    url: routes.admin.business.index,
    collapsible: true,
    children: [
      {
        key: 'business-list',
        label: 'My businesses',
        url: routes.admin.business.index,
      },
      {
        key: 'services',
        label: 'Services',
        url: '/business/services',
      },
    ],
  },
  {
    key: 'booking-forms',
    icon: 'form',
    label: 'Booking forms',
    url: routes.admin.bookingForms.index,
  },
  {
    key: 'team-members',
    icon: 'users',
    label: 'Team Members',
    url: routes.admin.teamMembers.index,
  },
];
