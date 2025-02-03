"use client";

import { ReactElement, useRef } from "react";
import SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { Logo, Menu } from "@/components";
import { Link } from "@react-email/components";
import { routes } from "@/lib/routes";

import { IMenuItem } from "../types/menu.types";
import { SidebarItem } from "./components/SidebarItem";
import { config } from "@/config";

export const Sidebar = ({
  menuItems,
}: {
  menuItems: IMenuItem[];
}): ReactElement => {
  const scrollRef = useRef<SimpleBarCore | null>(null);

  return (
    <div className="w-[240px]">
      <Link
        href={routes.admin.dashboard.index}
        className="flex h-16 items-center justify-center"
      >
        <Logo text={config.app.name} />
      </Link>
      <SimpleBar
        ref={scrollRef}
        className="h-[calc(100vh-64px)] lg:h-[calc(100vh-230px)]"
      >
        <Menu className="mb-6">
          {menuItems.map((item, index) => (
            <SidebarItem menuItem={item} key={index} />
          ))}
        </Menu>
      </SimpleBar>
    </div>
  );
};
