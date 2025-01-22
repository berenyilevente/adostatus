export type AlertVariant = "success" | "warning" | "error" | "info";

export const variantMap: Record<AlertVariant, string> = {
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
  info: "alert-info",
};
