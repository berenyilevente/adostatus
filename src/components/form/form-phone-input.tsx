'use client';

import { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { cn } from '@/utils';
import { PhoneInput } from '../ui/phone-input';

type FormPhoneInputProps<
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

export const FormPhoneInput = <
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
  ...props
}: FormPhoneInputProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="!cursor-pointer">{label}</FormLabel>}
          <FormControl>
            <PhoneInput {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
FormPhoneInput.displayName = 'FormPhoneInput';
