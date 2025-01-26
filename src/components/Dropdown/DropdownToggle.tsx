"use client";

import { ReactNode } from "react";

import { cn } from "@/utils/combineClassNames";

interface DropdownToggleProps {
  children: ReactNode;
  className?: string;
}

export const DropdownToggle = ({
  children,
  className,
}: DropdownToggleProps) => {
  return (
    <summary className={cn("btn btn-ghost m-1", className)}>{children}</summary>
  );
};
