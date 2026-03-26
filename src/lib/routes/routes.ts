export const routes = {
  landing: '/',
  admin: {
    dashboard: { index: '/dashboard' },
    taxRecords: {
      index: '/tax-records',
      month: (year: number, month: number) => `/tax-records/${year}/${month}`,
    },
    clients: {
      index: '/clients',
      detail: (clientId: string) => `/clients/${clientId}`,
      taxRecordMonth: (clientId: string, year: number, month: number) =>
        `/clients/${clientId}/tax-records/${year}/${month}`,
    },
    bankDetails: { index: '/bank-details' },
  },
  auth: {
    login: '/api/auth/login',
    emailSent: '/api/auth/verify-request',
  },
  dashboard: {
    index: '/dashboard',
  },
};
