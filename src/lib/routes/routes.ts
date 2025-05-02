export const routes = {
  landing: "/",
  admin: {
    dashboard: { index: "/dashboard" },
    users: { index: "/users", create: "/users/create" },
    formBuilder: { index: "/form-builder" },
  },
  auth: {
    login: "/api/auth/login",
    emailSent: "/api/auth/verify-request",
  },
  dashboard: {
    index: "/dashboard",
  },
};
