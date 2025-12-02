'use client';

import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  IconType,
  Input,
} from '@/components';
import { Slider } from '../ui/slider';

interface FormSliderProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> {
  control: Control<TField, object>;
  name: TName;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const FormSlider = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  label,
  description,
  min,
  max,
  step,
  ...props
}: FormSliderProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <Slider
              value={[field.value]}
              min={min}
              max={max}
              step={step}
              onValueChange={(value) => field.onChange(value[0])}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

FormSlider.displayName = 'FormSlider';
