export type ButtonVariant =
  | "ghost"
  | "link"
  | "outline"
  | "active"
  | "disabled"
  | "glass";

export const variantMap: Record<ButtonVariant, string> = {
  ghost: "btn-ghost",
  link: "btn-link",
  outline: "btn-outline",
  active: "btn-active",
  disabled: "btn-disabled",
  glass: "glass",
};

export type ButtonColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

export const colorMap: Record<ButtonColor, string> = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
};

export const sizeMap = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};
