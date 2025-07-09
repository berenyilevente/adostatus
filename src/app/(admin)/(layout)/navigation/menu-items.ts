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
  {
    key: 'calendar',
    icon: 'calendar',
    label: 'Calendar',
    url: routes.admin.calendar.index,
  },
];
