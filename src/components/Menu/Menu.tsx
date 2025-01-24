"use client";

import { HTMLAttributes, forwardRef } from "react";

import { getClassNames } from "./menu.helper";

export type MenuProps = HTMLAttributes<HTMLUListElement> & {
  size?: "lg" | "md" | "sm" | "xs";
  vertical?: boolean;
  horizontal?: boolean;
  responsive?: boolean;
};

export const Menu = forwardRef<HTMLUListElement, MenuProps>(
  (
    { responsive, horizontal, vertical, className, size = "md", ...props },
    ref
  ) => {
    const classNames = getClassNames({
      responsive,
      horizontal,
      vertical,
      size,
      className,
    });

    return <ul className={classNames} {...props} ref={ref} />;
  }
);

Menu.displayName = "Menu";
