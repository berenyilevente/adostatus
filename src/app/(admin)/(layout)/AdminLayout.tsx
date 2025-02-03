"use client";

import { adminMenuItems } from "./navigation/menu";
import { Sidebar } from "./navigation/Sidebar";
import { Topbar } from "./navigation/TopBar";
import { NavigationProvider } from "./navigation/use-navigation";

const AdminLayout = ({ children }: { children: any }) => {
  return (
    <NavigationProvider>
      <div className="size-full">
        <div className="flex overflow-hidden">
          <Sidebar menuItems={adminMenuItems} />
          <div className="site-layout overflow-auto">
            <div className="flex h-full flex-col">
              <Topbar />
              <div className="content-layout">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
};
export default AdminLayout;
