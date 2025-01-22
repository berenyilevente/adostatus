import { HTMLAttributes, ReactElement, forwardRef } from "react";

import { cn } from "@/utils";

import NavbarSection, { NavbarSectionProps } from "./NavbarSection";

export type NavbarProps = HTMLAttributes<HTMLDivElement>;

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ children, className, ...props }, ref): ReactElement => {
    const classes = cn("navbar", className);

    return (
      <div
        role="navigation"
        aria-label="Navbar"
        {...props}
        className={classes}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const NavbarStart = forwardRef<
  HTMLDivElement,
  Omit<NavbarSectionProps, "section">
>((props, ref) => <NavbarSection {...props} section="start" ref={ref} />);

const NavbarCenter = forwardRef<
  HTMLDivElement,
  Omit<NavbarSectionProps, "section">
>((props, ref) => <NavbarSection {...props} section="center" ref={ref} />);

const NavbarEnd = forwardRef<
  HTMLDivElement,
  Omit<NavbarSectionProps, "section">
>((props, ref) => <NavbarSection {...props} section="end" ref={ref} />);

Navbar.displayName = "Navbar";
NavbarStart.displayName = "Navbar Start";
NavbarCenter.displayName = "Navbar Center";
NavbarEnd.displayName = "Navbar End";

export { NavbarStart, NavbarCenter, NavbarEnd };
