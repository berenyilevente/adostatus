"use client";

import { Icon as ReactIcon, IconProps as ReactIconProps } from "@iconify/react";
import { iconMap } from "./icon.helper";
import { cn } from "@/utils";

export type IconType = keyof typeof iconMap;

interface IconProps extends ReactIconProps {
  icon: IconType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Icon = ({ size = "sm", className, icon, ...props }: IconProps) => {
  const sizeMap = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  return (
    <ReactIcon
      {...props}
      icon={iconMap[icon]}
      className={cn(className, sizeMap[size])}
    />
  );
};

Icon.displayName = "Icon";
