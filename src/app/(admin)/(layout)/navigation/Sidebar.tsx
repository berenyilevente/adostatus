"use client";

import { ReactElement, useRef, useState } from "react";
import SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import { Link } from "@react-email/components";
import "simplebar-react/dist/simplebar.min.css";

import { Button, Icon, Logo, Menu } from "@/components";
import { routes } from "@/lib/routes";
import { config } from "@/config";

import { IMenuItem } from "../types/menu.types";
import { SidebarItem } from "./components/SidebarItem";
import { cn } from "@/utils/combineClassNames";
import { useNavigation } from "./use-navigation";

export const Sidebar = ({
  menuItems,
}: {
  menuItems: IMenuItem[];
}): ReactElement => {
  const { isNavbarOpen } = useNavigation();
  const scrollRef = useRef<SimpleBarCore | null>(null);
  return (
    <div
      className={cn(
        "transition-all duration-300",
        isNavbarOpen ? "w-[250px]" : "w-[64px]"
      )}
    >
      <Link
        href={routes.admin.dashboard.index}
        className="flex h-16 items-center justify-center"
      >
        <Button variant="ghost">
          <Logo text={isNavbarOpen ? config.app.name : ""} />
        </Button>
      </Link>
      <SimpleBar
        ref={scrollRef}
        className="h-[calc(100vh-64px)] lg:h-[calc(100vh-230px)]"
      >
        <Menu className="mb-6">
          {menuItems.map((item, index) => (
            <SidebarItem menuItem={item} key={index} isOpen={isNavbarOpen} />
          ))}
        </Menu>
      </SimpleBar>
    </div>
  );
};
