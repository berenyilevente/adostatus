"use client";

import { Switch } from "@/components";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

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
