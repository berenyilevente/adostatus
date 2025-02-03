"use client";

import { Icon } from "@/components/Icon/Icon";
import { Button } from "@/components/Button/Button";
import { ReactElement, useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { InputProps } from "../TextInput/Input";

interface PasswordInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends Omit<InputProps, "startIcon" | "endIcon"> {
  control: Control<TField>;
  name: TName;
}

export const PasswordInput = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  name,
  ...props
}: PasswordInputProps<TField, TName>): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      {...props}
      name={name}
      type={showPassword ? "text" : "password"}
      endIconComponent={
        <Button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          size="xs"
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
