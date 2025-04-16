import { FC, forwardRef } from "react";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavBarProps
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

const NavBarCenter = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="justify-self-center" {...props}>
      {children}
    </div>
  )
);
NavBarCenter.displayName = "NavBarCenter";

const NavbarEnd = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="justify-self-end" {...props}>
      {children}
    </div>
  )
);
NavbarEnd.displayName = "NavbarEnd";

const NavBar = forwardRef<HTMLElement, NavBarProps>(
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
NavBar.displayName = "NavBar";

export { NavbarStart, NavBarCenter, NavbarEnd, NavBar };
