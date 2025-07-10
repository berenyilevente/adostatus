'use client';

import { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Switch,
} from '@/components';
import { cn } from '@/lib/utils';

type FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  className?: string;
  label?: string;
  description?: string;
};

export const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  className,
  label,
  description,
  ...props
}: FormSwitchProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex w-full flex-row items-center justify-between gap-2 rounded-lg border px-4 py-2',
            className
          )}
        >
          <div className="space-y-0.5">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              {...props}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="w-9"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
FormSwitch.displayName = 'FormSwitch';
