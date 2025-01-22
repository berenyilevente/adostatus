import { cn } from "@/utils";
import React, { ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children, className }: CardBodyProps) => {
  return (
    <div>
      <div className={cn("card-body", className)}>{children}</div>
    </div>
  );
};

CardBody.displayName = "Card Body";
