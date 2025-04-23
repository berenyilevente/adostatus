"use client";

import { ReactElement, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Icon, Button, TextInput } from "@/components";

interface PasswordInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends React.ComponentProps<"input"> {
  control: Control<TField>;
  name: TName;
}

export const PasswordInput = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  ...props
}: PasswordInputProps<TField, TName>): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      {...props}
      control={control}
      name={name}
      type={showPassword ? "text" : "password"}
      endIconComponent={
        <Button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          size="sm"
          aria-label="Show/Hide password"
          variant="ghost"
          className="hover:bg-base-content/10"
        >
          <Icon
            icon={showPassword ? "eyeOff" : "eye"}
            className="text-base-content/80"
            size="xs"
          />
        </Button>
      }
    />
  );
};
