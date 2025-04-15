"use client";

import React, { Ref, forwardRef } from "react";
import { Control, Controller } from "react-hook-form";

import { useOutsideClickHandler } from "@/hooks/use-outside-click-handler";
import { IconType } from "@/components";
import { cn } from "@/utils/combineClassNames";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export interface SelectInputProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  name: string;
  control: Control<any> | undefined;
  placeholder?: string;
  error?: any;
  selectLabel?: string;
}

export const SelectInput = forwardRef(
  ({
    options,
    name,
    control,
    placeholder = "Select an option",
    error,
    selectLabel,
    ...props
  }: SelectInputProps) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div {...field} {...props}>
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
              <span className="text-error text-start">{error as string}</span>
            )}
          </div>
        )}
      />
    );
  }
);
