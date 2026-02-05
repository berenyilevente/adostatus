'use client';

import React, { ReactNode } from 'react';
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
  actionButton?: ReactNode;
  disabled?: boolean;
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
  actionButton,
  disabled,
}: FormSelectProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl className={cn({ 'border-red-500': fieldState.error })}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  {option.label}
                </SelectItem>
              ))}
              {actionButton}
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
