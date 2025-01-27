"use client";

import { HTMLAttributes, ReactElement } from "react";

import { ComponentPosition } from "@/types/component.types";
import { ComponentColor } from "@/types/component.types";
import { cn } from "@/utils";

import { colorMap, positionMap } from "./tooltip.helper";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  children: ReactElement;
  position?: ComponentPosition;
  color?: ComponentColor;
  open?: boolean;
}

export const Tooltip = ({
  message,
  children,
  position = "top",
  color = "primary",
  className,
  open = false,
}: TooltipProps) => {
  return (
    <div
      className={cn(
        "tooltip",
        positionMap[position],
        colorMap[color],
        open && "tooltip-open",
        className
      )}
      data-tip={message}
    >
      {children}
    </div>
  );
};
