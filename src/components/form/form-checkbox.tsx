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
  ...props
}: FormCheckboxProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex w-full flex-row items-center space-x-3 space-y-0 rounded-md border px-4 py-[10px] cursor-pointer',
            className
          )}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} {...props} />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel className="!cursor-pointer">{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
FormCheckbox.displayName = 'FormCheckbox';
