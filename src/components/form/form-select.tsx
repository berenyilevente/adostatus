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

export type FormSelectOption = {
  label: string;
  value: string;
};

interface FormSelectProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> {
  options: FormSelectOption[];
  name: TName;
  control: Control<TField>;
  placeholder?: string;
  label?: string;
  description?: string;
  className?: string;
}

export const FormSelect = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  options,
  name,
  control,
  placeholder = 'Select an option',
  label,
  description,
  className,
}: FormSelectProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn('flex flex-col', className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className={cn({ 'border-red-500': fieldState.error })}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

FormSelect.displayName = 'FormSelect';
