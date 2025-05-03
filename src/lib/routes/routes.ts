export const routes = {
  landing: "/",
  admin: {
    dashboard: { index: "/dashboard" },
    users: { index: "/users", create: "/users/create" },
    bookingForms: { index: "/booking-forms", create: "/booking-forms/create" },
  },
  auth: {
    login: "/api/auth/login",
    emailSent: "/api/auth/verify-request",
  },
  dashboard: {
    index: "/dashboard",
  },
};
