"use client";

import { LabelHTMLAttributes } from "react";

import { Button } from "@/components";
import { ComponentColor, ComponentSize } from "@/types/components.type";

interface DropdownToggleProps extends LabelHTMLAttributes<HTMLLabelElement> {
  color?: ComponentColor;
  size?: ComponentSize;
  button?: boolean;
  disabled?: boolean;
}

export const DropdownToggle = ({
  children,
  color,
  size,
  button = true,
  className,
  disabled,
  ...props
}: DropdownToggleProps) => {
  return (
    <label tabIndex={0} className={className} {...props}>
      {button ? (
        <summary className="btn btn-ghost m-1">{children}</summary>
      ) : (
        children
      )}
    </label>
  );
};
