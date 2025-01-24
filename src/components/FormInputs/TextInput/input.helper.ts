import { cn } from "@/utils/combineClassNames";
import { InputProps } from "./Input";

export const sizeClass = {
  lg: "input-lg",
  md: "input-md",
  sm: "input-sm",
  xs: "input-xs",
};

export const colorClass = {
  primary: "input-primary",
  secondary: "input-secondary",
  accent: "input-accent",
  ghost: "input-ghost",
  info: "input-info",
  success: "input-success",
  warning: "input-warning",
  error: "input-error",
};

export const getClassNames = (props: InputProps) => {
  const { size = "md", color = "primary", className } = props;
  return cn(
    "input",
    className,
    sizeClass[size],
    colorClass[color],
    "border-none focus:outline-none w-full"
  );
};
