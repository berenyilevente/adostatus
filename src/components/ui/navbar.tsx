import { FC, forwardRef } from 'react';

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavbarProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> {}

const NavbarStart = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={`justify-self-start ${className}`} {...props}>
      {children}
    </div>
  )
);
NavbarStart.displayName = 'NavbarStart';

const NavbarCenter = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={`justify-self-center ${className}`} {...props}>
      {children}
    </div>
  )
);
NavbarCenter.displayName = 'NavbarCenter';

const NavbarEnd = forwardRef<HTMLDivElement, NavItemProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={`justify-self-end ${className}`} {...props}>
      {children}
    </div>
  )
);
NavbarEnd.displayName = 'NavbarEnd';

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ children, className, ...props }, ref) => (
  <nav
    ref={ref}
    className={`grid grid-flow-col py-3 px-0 place-items-center ${className}`}
    {...props}
  >
    {children}
  </nav>
));
Navbar.displayName = 'Navbar';

export { NavbarStart, NavbarCenter, NavbarEnd, Navbar };
