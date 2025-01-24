"use client";

import { cn } from "@/utils";
import { ReactElement, ReactNode } from "react";

export const NavbarStart = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}): ReactElement => {
  return <div className={cn("navbar-start", className)}>{children}</div>;
};
