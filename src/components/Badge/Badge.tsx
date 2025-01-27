"use client";

import { ComponentColor, ComponentSize } from "@/types/component.types";
import { cn } from "@/utils/combineClassNames";
import { ReactElement, ReactNode } from "react";
import { colorMap } from "../Tooltip/tooltip.helper";
import { sizeMap } from "../Button/button.helper";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  color?: ComponentColor;
  size?: ComponentSize;
}

export const Badge = ({
  children,
  className,
  color = "primary",
  size = "md",
}: BadgeProps): ReactElement => {
  const classNames = cn("badge", colorMap[color], sizeMap[size], className);

  return <div className={classNames}>{children}</div>;
};
