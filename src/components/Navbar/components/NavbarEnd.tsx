"use client";

import { cn } from "@/utils";
import { ReactElement, ReactNode } from "react";

export const NavbarEnd = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}): ReactElement => {
  return <div className={cn("navbar-end", className)}>{children}</div>;
};
