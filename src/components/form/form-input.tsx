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

const iconBaseClassNames = 'absolute top-[26px] -translate-y-1/2 text-gray-400';

const StartIcon = ({
  startIcon,
  label,
}: {
  startIcon?: IconType;
  label?: boolean;
}) => {
  if (!startIcon) {
    return null;
  }

  return (
    <Icon
      icon={startIcon}
      className={cn(iconBaseClassNames, 'left-3', label && '!top-[31px]')}
      size="xs"
    />
  );
};

const EndIcon = ({
  endIcon,
  label,
}: {
  endIcon?: IconType;
  label?: boolean;
}) => {
  if (!endIcon) {
    return null;
  }

  return (
    <Icon
      icon={endIcon}
      size="xs"
      className={cn(iconBaseClassNames, 'right-3', label && '!top-[31px]')}
    />
  );
};

interface FormInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends React.ComponentProps<'input'> {
  control: Control<TField, object>;
  name: TName;
  placeholder?: string;
  startIcon?: IconType;
  endIcon?: IconType;
  endIconComponent?: ReactNode;
  label?: string;
  description?: string;
}

export const FormInput = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  placeholder,
  className,
  startIcon,
  endIcon,
  endIconComponent,
  label,
  description,
  ...props
}: FormInputProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn('relative flex flex-col', className)}>
          {label && (
            <FormLabel>
              {label}
              <span className="text-red-500 pl-1">
                {props.required ? '*' : ''}
              </span>
            </FormLabel>
          )}
          <StartIcon startIcon={startIcon} label={!!label} />
          <FormControl>
            <Input
              {...field}
              {...props}
              placeholder={placeholder}
              className={cn(startIcon && 'pl-10', endIcon && 'pr-10', {
                'border-red-500': fieldState.error,
              })}
            />
          </FormControl>
          <EndIcon endIcon={endIcon} label={!!label} />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
FormInput.displayName = 'FormInput';
