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
  placeholder?: string;
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
  const getClassName = (fieldState: ControllerFieldState) =>
    cn(
      "form-control flex input input-bordered flex-row items-center outline-none focus:outline-none",
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
      {label && <Label htmlFor={name} title={label} />}
      <Controller<TField, TName>
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className={getClassName(fieldState)}>
              {startIcon ? <Icon icon={startIcon} size="xs" /> : null}
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
                className={cn("transition-all")}
              />
              {endIcon ? <Icon icon={endIcon} size="xs" /> : null}
            </div>
            {fieldState.invalid && (
              <span className="text-sm text-error text-start">
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
