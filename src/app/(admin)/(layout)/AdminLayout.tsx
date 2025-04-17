"use client";

import { Topbar } from "./navigation/TopBar";

const AdminLayout = ({ children }: { children: any }) => {
  return (
    <div className="size-full">
      <div className="flex overflow-hidden">
        <div className="site-layout overflow-auto">
          <Topbar />
          <div className="flex h-full flex-col">
            <div className="content-layout">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
