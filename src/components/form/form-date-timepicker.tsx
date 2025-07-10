'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Control, FieldPath, FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SmartDatetimeInput } from '../ui/extension/smart-datetime-input';

interface FormDateTimePickerProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> {
  name: TName;
  control: Control<TField>;
  placeholder?: string;
  label?: string;
  description?: string;
  className?: string;
  modal?: boolean;
}

export const FormDateTimePicker = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  name,
  control,
  placeholder,
  label,
  description,
  className,
  modal,
}: FormDateTimePickerProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <SmartDatetimeInput
              value={field.value as Date}
              onValueChange={field.onChange}
              placeholder={placeholder}
              className={className}
              modal={modal}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

FormDateTimePicker.displayName = 'FormDateTimePicker';
