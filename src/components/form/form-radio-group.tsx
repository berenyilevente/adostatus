"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import { RadioGroupItemProps } from "@radix-ui/react-radio-group";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from "@/components";

type FormRadioGroupProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> = Omit<RadioGroupItemProps, "name"> & {
  control: Control<TField>;
  name: TName;
  items: {
    label: string;
    value: string;
  }[];
  label?: string;
  description?: string;
};

export const FormRadioGroup = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  className,
  value,
  label,
  description,
  items,
  ...props
}: FormRadioGroupProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {items.map((item, index) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={`${index}-${item.value}`}
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
FormRadioGroup.displayName = "FormRadioGroup";
