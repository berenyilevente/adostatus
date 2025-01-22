import { LiHTMLAttributes, forwardRef } from "react";

import { cn } from "@/utils";

export type MenuItemProps = LiHTMLAttributes<HTMLLIElement> & {
  disabled?: boolean;
};

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ className, disabled, ...props }, ref) => {
    const classNames = cn(className, {
      disabled: disabled,
    });

    return <li className={classNames} {...props} ref={ref} />;
  }
);

MenuItem.displayName = "Menu Item";
