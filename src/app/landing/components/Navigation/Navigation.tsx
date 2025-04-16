"use client";

import Link from "next/link";

import {
  Icon,
  Logo,
  Button,
  Menu,
  MenuItem,
  Navbar,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components";

import { cn } from "@/utils";
import { config } from "@/config/main.config";
import { useToggle } from "@/hooks/use-toggle";
import { NavbarEnd, NavbarStart } from "@/components";

export const Navigation = () => {
  const { isOpen: drawerOpened, toggle: toggleDrawer } = useToggle();

  const menuItems = [
    { label: "Home", href: "" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Join waitlist", href: "#footer", highlight: true },
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost">
                      <Icon icon="menu" className="inline-block text-xl" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="z-[70] w-full h-min" side="top">
                    <SheetHeader>
                      <SheetTitle>
                        <Link href="/">
                          <Logo
                            size={38}
                            text={config.app.name}
                            textPosition="right"
                          />
                        </Link>
                      </SheetTitle>
                      <SheetDescription>
                        <div className="flex flex-col gap-2">
                          {menuItems.map((item) => (
                            <div className="font-medium" key={item.label}>
                              <SheetClose asChild>
                                <Link href={item.href}>{item.label}</Link>
                              </SheetClose>
                            </div>
                          ))}
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
              <Link href="/">
                <Logo size={38} text={config.app.name} textPosition="right" />
              </Link>
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
