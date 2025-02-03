import { cn } from "@/utils/combineClassNames";

import { RadioProps } from "./Radio";

export const sizeClass = {
  lg: "radio-lg",
  md: "radio-md",
  sm: "radio-sm",
  xs: "radio-xs",
};

export const colorClass = {
  primary: "radio-primary",
  secondary: "radio-secondary",
  accent: "radio-accent",
  ghost: "radio-ghost",
  info: "radio-info",
  success: "radio-success",
  warning: "radio-warning",
  error: "radio-error",
};

export const getClassNames = (props: RadioProps) => {
  const { size = "md", color = "primary", className } = props;
  return cn(
    "radio",
    className,
    sizeClass[size],
    colorClass[color],
    "border-none focus:outline-none w-full"
  );
};
