export const routes = {
  landing: '/',
  admin: {
    dashboard: { index: '/dashboard' },
    users: { index: '/users', create: '/users/create' },
    bookingForms: { index: '/booking-forms', create: '/booking-forms/create' },
    business: {
      index: '/business',
      create: '/business/create',
      show: '/business/show',
    },
    teamMembers: { index: '/team-members', create: '/team-members/create' },
    calendar: { index: '/calendar' },
  },
  auth: {
    login: '/api/auth/login',
    emailSent: '/api/auth/verify-request',
  },
  dashboard: {
    index: '/dashboard',
  },
};
