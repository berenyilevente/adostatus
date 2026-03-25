'use client';

import { AppTopbar } from './navigation/AppTopbar';

import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full">
      <div className="flex overflow-hidden">
        <div className="site-layout overflow-auto">
          <AppTopbar />
          <div className="flex h-full flex-col">
            <div className="content-layout">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
