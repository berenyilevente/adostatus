"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import { RadioGroupItemProps } from "@radix-ui/react-radio-group";

import {
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroupItem,
} from "@/components";
import Link from "next/link";
import { cn } from "@/utils";

type FormCheckboxProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> = {
  control: Control<TField>;
  name: TName;
  label?: string;
  description?: string;
  link?: string;
  linkText?: string;
  className?: string;
};

export const FormCheckbox = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  label,
  description,
  link,
  linkText,
  className,
}: FormCheckboxProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0",
            className
          )}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>
              <>
                {description}{" "}
                {link && (
                  <Link href={link} className="text-primary">
                    {linkText}
                  </Link>
                )}
              </>
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};
FormCheckbox.displayName = "FormCheckbox";
