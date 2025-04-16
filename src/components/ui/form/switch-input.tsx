"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Switch } from "@/components";

type SwitchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  className?: string;
};

export const SwitchInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  className,
  ...props
}: SwitchInputProps<TFieldValues, TName>) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      render={({ field }) => (
        <Switch
          {...field}
          {...props}
          className={className}
          checked={field.value}
        />
      )}
      name={name}
    />
  );
};
