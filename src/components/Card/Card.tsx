import { cn } from "@/utils";
import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={cn("card shadow-md", className)} {...props}>
      {children}
    </div>
  );
};

Card.displayName = "Card";
