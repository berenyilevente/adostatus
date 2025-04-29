"use client";

import { ReactElement } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormItem,
  FormMessage,
  FormDescription,
  FormControl,
  FormLabel,
  FormField,
  Textarea,
} from "@/components";

interface FormTextareaProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends React.HTMLAttributes<HTMLTextAreaElement> {
  control: Control<TField>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
}

export const FormTextarea = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  ...props
}: FormTextareaProps<TField, TName>): ReactElement => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...props} placeholder={placeholder} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
FormTextarea.displayName = "FormTextarea";
