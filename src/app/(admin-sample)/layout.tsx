"use client";

import { SessionProvider } from "next-auth/react";

import { SidebarProvider } from "@/components";

import AdminLayout from "./(layout)/AdminLayout";
import { AppSidebar } from "./(layout)/navigation/AppSidebar";

const Layout = ({ children }: { children: any }) => {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <AdminLayout>{children}</AdminLayout>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default Layout;
