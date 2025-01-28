"use client";

import { LabelHTMLAttributes, ReactElement, forwardRef } from "react";

import { cn } from "@/utils";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  title?: string;
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, title, className, ...props }, ref): ReactElement => {
    const classNames = cn("label", className);

    return (
      <label {...props} className={classNames}>
        <span className="label-text text-start" ref={ref}>
          {title}
        </span>
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
