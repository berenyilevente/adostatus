"use client";

import React, { Ref, forwardRef } from "react";
import { Control, Controller } from "react-hook-form";

import { useOutsideClickHandler } from "@/hooks/use-outside-click-handler";
import { IconType } from "@/components";
import { cn } from "@/utils/combineClassNames";

export interface SelectInputProps {
  options: string[];
  name: string;
  control: Control<any> | undefined;
  iconType?: IconType;
  placeholder?: string;
  error?: any;
  size?: "lg" | "md" | "sm" | "xs";
  className?: string;
}

export const SelectInput = forwardRef(
  (
    {
      options,
      name,
      control,
      placeholder = "Select an option",
      error,
      size = "md",
      className,
    }: SelectInputProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { visible, setVisible } = useOutsideClickHandler(false);

    const sizeClass = {
      lg: "select-lg",
      md: "select-md",
      sm: "select-sm",
      xs: "select-xs",
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            {...field}
            ref={ref}
            className={`dropdown w-full dropdown-bottom  ${
              visible ? "open" : ""
            }`}
          >
            <div
              tabIndex={0}
              className={cn(
                "select select-bordered w-full flex justify-between items-center",
                sizeClass[size],
                error ? "input-error" : "",
                className
              )}
              onClick={() => setVisible(!visible)}
            >
              {field.value ? field.value : placeholder}
            </div>
            {visible && (
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content z-50 bg-base-100 rounded-box w-max whitespace-nowrap"
              >
                {options.map((option, index) => (
                  <li key={index}>
                    <a
                      onClick={() => {
                        field.onChange(option);
                        setVisible(false);
                      }}
                    >
                      {option as React.ReactNode}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <span className="text-error text-start">{error as string}</span>
            )}
          </div>
        )}
      />
    );
  }
);
