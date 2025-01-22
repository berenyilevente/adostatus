import { cn } from "@/utils";
import React, { ReactNode } from "react";

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

export const CardActions = ({ children, className }: CardActionsProps) => {
  return <div className={cn("card-actions", className)}>{children}</div>;
};

CardActions.displayName = "Card Actions";
