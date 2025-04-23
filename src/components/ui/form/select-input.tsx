"use client";

import React, { forwardRef } from "react";
import { Control, Controller } from "react-hook-form";

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
import { cn } from "@/utils";

export interface SelectInputProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  name: string;
  control: Control<any> | undefined;
  placeholder?: string;
  error?: any;
  selectLabel?: string;
  label?: string;
  description?: string;
}

export const SelectInput = forwardRef<HTMLDivElement, SelectInputProps>(
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
    }: SelectInputProps,
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

SelectInput.displayName = "SelectInput";
