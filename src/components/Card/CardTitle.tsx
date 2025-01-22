import { cn } from "@/utils";
import React, { ReactNode } from "react";

interface CardTitleProps {
  className?: string;
  children?: ReactNode;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return <div className={cn("card-title", className)}>{children}</div>;
};

CardTitle.displayName = "Card Title";
