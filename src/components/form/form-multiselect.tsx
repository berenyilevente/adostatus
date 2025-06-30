'use client';

import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { cn } from '@/lib/utils';
import { MultiSelect } from '../ui/multiselect';

export type FormMultiselectOption = {
  label: string;
  value: string;
};

interface FormMultiselectProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> {
  options: FormMultiselectOption[];
  name: TName;
  control: Control<TField>;
  placeholder?: string;
  label?: string;
  description?: string;
}

export const FormMultiselect = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  options,
  name,
  control,
  placeholder = 'Select an option',
  label,
  description,
}: FormMultiselectProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col ">
          <FormLabel>{label}</FormLabel>
          <MultiSelect
            options={options}
            onValueChange={field.onChange}
            defaultValue={field.value}
            placeholder={placeholder}
          />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

FormMultiselect.displayName = 'FormMultiselect';
