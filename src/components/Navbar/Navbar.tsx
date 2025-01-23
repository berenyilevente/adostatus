import { cn } from "@/utils";
import { ReactElement, ReactNode } from "react";

interface NavbarProps {
  children?: ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps): ReactElement => {
  return <div className={cn("navbar bg-base-100", className)}>{children}</div>;
};
