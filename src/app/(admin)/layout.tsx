'use client';

import { SessionProvider } from 'next-auth/react';

import { SidebarProvider } from '@/components';

import AdminLayout from './(layout)/AdminLayout';
import { AppSidebar } from './(layout)/navigation/AppSidebar';
import { usePathname } from 'next/navigation';

const EXCLUDED_PAGES = ['/onboard-user'];

const Layout = ({ children }: { children: any }) => {
  const pathname = usePathname();
  const shouldExcludeFromAdminLayout = EXCLUDED_PAGES.includes(pathname);

  if (shouldExcludeFromAdminLayout) {
    return <SessionProvider>{children}</SessionProvider>;
  }

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
