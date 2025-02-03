"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";

import { ComponentColor, ComponentSize } from "@/types/component.types";

import { getClassNames } from "./radio.helper";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  color?: ComponentColor;
  size?: ComponentSize;
  name?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, name, size, color, ...props }, ref): React.ReactElement => {
    const classNames = getClassNames({
      size,
      color,
      className,
    });

    return (
      <input
        {...props}
        ref={ref}
        type="radio"
        name={name}
        className={classNames}
      />
    );
  }
);
