import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Toggle, ToggleProps } from "@/components";

type ToggleInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ToggleProps, "name"> & {
  control: Control<TFieldValues>;
  name: TName;
};

export const ToggleInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  className,
  ...props
}: ToggleInputProps<TFieldValues, TName>) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      render={({ field }) => (
        <Toggle
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
