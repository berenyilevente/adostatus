"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { RadioGroupItem } from "@/components";
import { RadioGroupItemProps } from "@radix-ui/react-radio-group";

type RadioInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> = Omit<RadioGroupItemProps, "name"> & {
  control: Control<TField>;
  name: TName;
};

export const RadioInput = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  className,
  value,
  ...other
}: RadioInputProps<TField, TName>) => {
  return (
    <Controller<TField, TName>
      control={control}
      render={({ field }) => (
        <RadioGroupItem
          {...field}
          {...other}
          className={className}
          checked={field.value === value}
          onChange={() => field.onChange(value)}
        />
      )}
      name={name}
    />
  );
};
