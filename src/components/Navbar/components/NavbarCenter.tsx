"use client";

import { cn } from "@/utils";
import { ReactElement, ReactNode } from "react";

export const NavbarCenter = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}): ReactElement => {
  return <div className={cn("navbar-center", className)}>{children}</div>;
};
