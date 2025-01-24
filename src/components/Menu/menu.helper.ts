import { cn } from "@/utils";
import { MenuProps } from "./Menu";
import { IconType } from "..";

export const sizeClasses = {
  lg: "menu-lg",
  md: "menu-md",
  sm: "menu-sm",
  xs: "menu-xs",
};

export const menuClasses = {
  vertical: "menu-vertical",
  horizontal: "menu-horizontal",
  responsive: "menu-vertical lg:menu-horizontal",
};

export const getClassNames = (props: MenuProps) => {
  const { size, vertical, className } = props;

  const sizeClass = sizeClasses[size ?? "md"];
  const menuClass = menuClasses[vertical ? "vertical" : "horizontal"];

  return cn("menu", sizeClass, menuClass, className);
};
