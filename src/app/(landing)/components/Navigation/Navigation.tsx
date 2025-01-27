"use client";

import Link from "next/link";

import {
  Icon,
  Logo,
  Button,
  Drawer,
  Menu,
  MenuItem,
  Navbar,
} from "@/components";

import { cn } from "@/utils";
import { config } from "@/config/main.config";
import { useToggle } from "@/hooks/use-toggle";
import { NavbarEnd, NavbarStart } from "@/components";

export const Navigation = () => {
  const { isOpen: drawerOpened, toggle: toggleDrawer } = useToggle();

  const menuItems = [
    { label: "Home", href: "", highlight: false },
    { label: "Features", href: "#features", highlight: false },
    { label: "Join waitlist", href: "/leads", highlight: true },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[60] backdrop-blur-sm transition-all duration-500 border-b border-base-content/10 bg-base-100"
        )}
      >
        <div className="container">
          <Navbar className="px-0">
            <NavbarStart className="gap-2">
              <div className="flex-none lg:hidden">
                <Drawer
                  position="left"
                  isOpen={drawerOpened}
                  onClose={toggleDrawer}
                  content={
                    <Menu
                      size="sm"
                      className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content"
                    >
                      <MenuItem className="font-medium">
                        <Logo />
                      </MenuItem>
                      <div className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                          <MenuItem className="font-medium" key={item.label}>
                            <Link href={item.href}>{item.label}</Link>
                          </MenuItem>
                        ))}
                      </div>
                    </Menu>
                  }
                >
                  <Button variant="ghost" onClick={toggleDrawer}>
                    <Icon icon="menu" className="inline-block text-xl" />
                  </Button>
                </Drawer>
              </div>
              <Logo size={38} text={config.app.name} textPosition="right" />
            </NavbarStart>

            <NavbarEnd className="gap-3">
              <Menu
                horizontal
                size="sm"
                className="hidden gap-2 px-1 lg:inline-flex items-center"
              >
                {menuItems.map((item) => (
                  <MenuItem className="font-medium" key={item.label}>
                    <Link href={item.href}>
                      {item.highlight ? (
                        <Button
                          size={"sm"}
                          color="primary"
                          onClick={toggleDrawer}
                        >
                          {item.label}
                        </Button>
                      ) : (
                        item.label
                      )}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </NavbarEnd>
          </Navbar>
        </div>
      </div>
    </>
  );
};
