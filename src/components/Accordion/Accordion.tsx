"use client";

import { cn } from "@/utils/combineClassNames";
import { ReactElement, ReactNode } from "react";

export const Accordion = ({
  children,
  icon = "arrow",
  className,
}: {
  children: ReactNode;
  icon?: "arrow" | "plus";
  className?: string;
}): ReactElement => {
  const iconMap = {
    arrow: "collapse-arrow",
    plus: "collapse-plus",
  };

  const classNames = cn(
    "collapse border border-base-200",
    iconMap[icon],
    className
  );

  return (
    <div className={classNames}>
      <input type="radio" name="accordion" defaultChecked />
      {children}
    </div>
  );
};
