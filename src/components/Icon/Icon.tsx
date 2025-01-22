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
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
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
