import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Icon, IconType } from "@/components";
import { cn } from "@/utils";
import {
  ButtonVariant,
  ButtonColor,
  colorMap,
  sizeMap,
  variantMap,
} from "./button.helper";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  startIcon?: IconType;
  endIcon?: IconType;
  iconColor?: string;
  isLoading?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    children,
    disabled,
    iconColor,
    isLoading,
    variant = "active",
    color = "primary",
    type = "button",
    size = "md",
    startIcon,
    endIcon,
    fullWidth,
    ...props
  }) => {
    const classNames = cn(
      className,
      "btn",
      variantMap[variant],
      sizeMap[size],
      colorMap[color],
      "flex flex-nowrap items-center",
      fullWidth && "w-full"
    );

    return (
      <button {...props} className={classNames} type={type} disabled={disabled}>
        {isLoading ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          <>
            {startIcon && <Icon className={iconColor} icon={startIcon} />}
            <>{children}</>
            {endIcon && <Icon className={iconColor} icon={endIcon} />}
          </>
        )}
      </button>
    );
  }
);
