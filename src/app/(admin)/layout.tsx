'use client';

import { SessionProvider } from 'next-auth/react';

import { SidebarProvider } from '@/components';

import AdminLayout from './(layout)/AdminLayout';
import { AppSidebar } from './(layout)/navigation/AppSidebar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NextTopLoader from 'nextjs-toploader';

const EXCLUDED_PAGES = ['/onboard-user'];

const Layout = ({ children }: { children: any }) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const shouldExcludeFromAdminLayout = EXCLUDED_PAGES.includes(pathname);

  if (shouldExcludeFromAdminLayout) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <SessionProvider>
      <NextTopLoader color="#000" />
      <SidebarProvider open={open} onOpenChange={onOpenChange}>
        <AppSidebar />
        <AdminLayout>{children}</AdminLayout>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default Layout;
