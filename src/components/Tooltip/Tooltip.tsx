import { ReactElement } from "react";

import { ComponentPosition } from "@/types/components.type";
import { ComponentColor } from "@/types/components.type";
import { cn } from "@/utils";

import { colorMap, positionMap } from "./tooltip.helper";

export const Tooltip = ({
  message,
  children,
  position = "top",
  color = "primary",
  className,
  open = false,
}: {
  message: string;
  children: ReactElement;
  position?: ComponentPosition;
  color?: ComponentColor;
  className?: string;
  open?: boolean;
}) => {
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
