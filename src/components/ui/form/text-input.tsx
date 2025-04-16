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
  const getClassName = (fieldState: ControllerFieldState) =>
    cn(
      "form-control relative flex flex-row items-center",
      {
        "border border-error/60": fieldState.invalid,
        "ps-3": startIcon,
        "pe-3": endIcon,
        "bg-base-content/10": props.disabled,
      },
      className
    );

  return (
    <>
      <Controller<TField, TName>
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className={getClassName(fieldState)}>
              {startIcon ? (
                <Icon
                  icon={startIcon}
                  className="absolute top-1/2 left-6 -translate-y-1/2 h-4 w-4 text-gray-400"
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
                  className,
                  startIcon && "pl-10",
                  endIcon && "pr-10"
                )}
              />
              {endIcon ? (
                <Icon
                  icon={endIcon}
                  size="xs"
                  className="absolute top-1/2 right-6 -translate-y-1/2 h-4 w-4 text-gray-400"
                />
              ) : (
                endIconComponent
              )}
            </div>
            {fieldState.invalid && (
              <div className="text-sm text-error mt-1 text-start">
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
