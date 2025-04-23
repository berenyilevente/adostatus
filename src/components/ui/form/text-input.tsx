"use client";

import { ReactNode } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { cn } from "@/utils/combineClassNames";
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
} from "@/components";

const StartIcon = ({ startIcon }: { startIcon?: IconType }) => {
  if (!startIcon) {
    return null;
  }

  return (
    <Icon
      icon={startIcon}
      className="absolute top-[42px] left-3 -translate-y-1/2 text-gray-400"
      size="xs"
    />
  );
};

const EndIcon = ({ endIcon }: { endIcon?: IconType }) => {
  if (!endIcon) {
    return null;
  }

  return (
    <Icon
      icon={endIcon}
      size="xs"
      className="absolute top-[42px] right-3 -translate-y-1/2 text-gray-400"
    />
  );
};

interface TextInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends React.ComponentProps<"input"> {
  control: Control<TField, object>;
  name: TName;
  placeholder?: string;
  startIcon?: IconType;
  endIcon?: IconType;
  endIconComponent?: ReactNode;
  label?: string;
  description?: string;
}

export const TextInput = <
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
}: TextInputProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          <FormLabel>{label}</FormLabel>
          <StartIcon startIcon={startIcon} />
          <FormControl>
            <Input
              {...field}
              {...props}
              placeholder={placeholder}
              className={cn(
                startIcon && "pl-10",
                endIcon && "pr-10",
                {
                  "border-red-500": fieldState.error,
                },
                className
              )}
            />
          </FormControl>
          <EndIcon endIcon={endIcon} />
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
TextInput.displayName = "TextInput";
