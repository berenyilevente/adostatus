"use client";

import {
  Control,
  Controller,
  ControllerFieldState,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { cn } from "@/utils/combineClassNames";
import { Input, InputProps } from "./Input";
import { Icon, IconType, Label } from "@/components";

interface TextInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends InputProps {
  control: Control<TField, object>;
  name: TName;
  placeholder: string;
  startIcon?: IconType;
  endIcon?: IconType;
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
  label,
  ...props
}: TextInputProps<TField, TName>) => {
  const getErrorClassName = (fieldState: ControllerFieldState) =>
    cn(
      "form-control flex flex-row items-center rounded-box border border-base-content/20",
      {
        "border-error/60": fieldState.invalid,
        "ps-3": startIcon,
        "pe-3": endIcon,
        "bg-base-content/10": props.disabled,
      }
    );

  return (
    <>
      {label && <Label htmlFor={name} title={label} />}
      <Controller<TField, TName>
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className={getErrorClassName(fieldState)}>
              {startIcon && <Icon icon={startIcon} size="xs" />}
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
                placeholder={fieldState.invalid ? " " : placeholder}
                className={cn(className, "transition-all", {
                  "focus:!-outline-offset-1 focus:outline-red-500":
                    fieldState.invalid,
                })}
              />
              {endIcon && <Icon icon={endIcon} size="xs" />}
            </div>
            {fieldState.invalid && (
              <span className="mt-1 text-sm text-error">
                {fieldState.error?.message}
              </span>
            )}
          </>
        )}
        name={name}
      />
    </>
  );
};

TextInput.displayName = "TextInput";
