import { cn } from "@/utils/combineClassNames";
import { ToggleProps } from "./Toggle";

export const sizeClass = {
  lg: "toggle-lg",
  md: "toggle-md",
  sm: "toggle-sm",
  xs: "toggle-xs",
};

export const colorClass = {
  primary: "toggle-primary",
  secondary: "toggle-secondary",
  accent: "toggle-accent",
  ghost: "toggle-ghost",
  info: "toggle-info",
  success: "toggle-success",
  warning: "toggle-warning",
  error: "toggle-error",
};

export const getClassNames = (props: ToggleProps) => {
  const { size = "md", color = "primary", className } = props;
  return cn("toggle", className, sizeClass[size], colorClass[color]);
};
