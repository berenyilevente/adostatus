"use client";

import { SessionProvider } from "next-auth/react";
import AdminLayout from "./(layout)/AdminLayout";

const Layout = ({ children }: { children: any }) => {
  return (
    <SessionProvider>
      <AdminLayout>{children}</AdminLayout>
    </SessionProvider>
  );
};

export default Layout;
