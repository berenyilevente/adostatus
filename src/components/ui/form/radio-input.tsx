"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { RadioGroupItemProps } from "@radix-ui/react-radio-group";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroupItem,
} from "@/components";

type RadioInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> = Omit<RadioGroupItemProps, "name"> & {
  control: Control<TField>;
  name: TName;
  label?: string;
  description?: string;
};

export const RadioInput = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  className,
  value,
  label,
  description,
  ...other
}: RadioInputProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroupItem
              {...field}
              {...other}
              className={className}
              checked={field.value === value}
              onChange={() => field.onChange(value)}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
