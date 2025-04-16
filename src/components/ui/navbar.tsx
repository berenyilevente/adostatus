import { FC, forwardRef } from "react";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavbarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

const NavbarStart = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="justify-self-start" {...props}>
      {children}
    </div>
  )
);
NavbarStart.displayName = "NavbarStart";

const NavbarCenter = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="justify-self-center" {...props}>
      {children}
    </div>
  )
);
NavbarCenter.displayName = "NavbarCenter";

const NavbarEnd = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="justify-self-end" {...props}>
      {children}
    </div>
  )
);
NavbarEnd.displayName = "NavbarEnd";

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ children, ...props }, ref) => (
    <nav
      ref={ref}
      className="px-0 grid grid-flow-col py-3 place-items-center"
      {...props}
    >
      {children}
    </nav>
  )
);
Navbar.displayName = "Navbar";

export { NavbarStart, NavbarCenter, NavbarEnd, Navbar };
