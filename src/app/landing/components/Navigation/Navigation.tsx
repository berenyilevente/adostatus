"use client";

import { FC } from "react";
import Link from "next/link";

import {
  Icon,
  Logo,
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  MenubarTrigger,
  MenubarMenu,
  Menubar,
  MenubarSeparator,
  Navbar,
  NavbarStart,
  NavbarEnd,
} from "@/components";

import { cn } from "@/utils";
import { config } from "@/config/main.config";

const menuItems = [
  { label: "Home", href: "" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

const MobileMenu = () => {
  return (
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
              <Logo size={38} text={config.app.name} textPosition="right" />
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
  );
};

export const Navigation = () => {
  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[60] backdrop-blur-sm transition-all duration-500 border-b border-base-content/10 bg-base-100"
        )}
      >
        <div className="container">
          <Navbar>
            <NavbarStart>
              <div className="flex-none lg:hidden">
                <MobileMenu />
              </div>
              <Link href="/">
                <Logo size={38} text={config.app.name} textPosition="right" />
              </Link>
            </NavbarStart>

            <NavbarEnd>
              <Menubar className="border-none bg-transparent shadow-none">
                {menuItems.map((item) => (
                  <>
                    <MenubarMenu>
                      <MenubarTrigger className="font-medium" key={item.label}>
                        <Link href={item.href}>{item.label}</Link>
                      </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarSeparator />
                  </>
                ))}
                <Link href="#footer">
                  <Button size="sm" color="primary">
                    Join waitlist
                  </Button>
                </Link>
              </Menubar>
            </NavbarEnd>
          </Navbar>
        </div>
      </div>
    </>
  );
};
