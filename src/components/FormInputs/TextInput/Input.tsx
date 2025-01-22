"use client";

import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import { colorClass, getClassNames, sizeClass } from "./input.helper";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  size?: keyof typeof sizeClass;
  color?: keyof typeof colorClass;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
}

export const Input = forwardRef(
  (
    {
      id,
      name,
      placeholder,
      type,
      endIcon,
      startIcon,
      value = "",
      className,
      size = "md",
      color = "primary",
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const classNames = getClassNames({
      size,
      color,
      className,
    });

    return (
      <input
        {...props}
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classNames}
      />
    );
  }
);

Input.displayName = "Input";
