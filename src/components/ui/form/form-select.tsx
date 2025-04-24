"use client";

import React, { forwardRef } from "react";
import { Control } from "react-hook-form";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";

export interface FormSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  name: string;
  control: Control<any> | undefined;
  placeholder?: string;
  error?: any;
  selectLabel?: string;
  label?: string;
  description?: string;
}

export const FormSelect = forwardRef<HTMLDivElement, FormSelectProps>(
  (
    {
      options,
      name,
      control,
      placeholder = "Select an option",
      error,
      selectLabel,
      label,
      description,
      ...props
    }: FormSelectProps,
    ref
  ) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div {...field} {...props} ref={ref}>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{selectLabel}</SelectLabel>
                      {options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {error && (
                  <span className="text-error text-start">
                    {error as string}
                  </span>
                )}
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
FormSelect.displayName = "FormSelect";
