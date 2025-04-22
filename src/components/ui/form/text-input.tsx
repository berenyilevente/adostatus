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
import { Icon, IconType, Input } from "@/components";

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
  ...props
}: TextInputProps<TField, TName>) => {
  return (
    <>
      <Controller<TField, TName>
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="from-control relative">
              {startIcon ? (
                <Icon
                  icon={startIcon}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size="xs"
                />
              ) : null}
              <Input
                {...field}
                {...props}
                onChange={(event) => {
                  return field.onChange(
                    props.type === "number"
                      ? event.target.value.length > 0
                        ? parseFloat(event.target.value) + ""
                        : props.min
                      : event.target.value
                  );
                }}
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
              {endIcon ? (
                <Icon
                  icon={endIcon}
                  size="xs"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                />
              ) : (
                endIconComponent
              )}
            </div>
            {fieldState.invalid && (
              <div className="text-sm text-red-500 mt-1 text-start">
                {fieldState.error?.message}
              </div>
            )}
          </>
        )}
        name={name}
      />
    </>
  );
};
TextInput.displayName = "TextInput";
