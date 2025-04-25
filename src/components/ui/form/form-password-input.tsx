"use client";

import { ReactElement, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Icon, Button, FormInput } from "@/components";

interface FormPasswordInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends React.HTMLAttributes<HTMLInputElement> {
  control: Control<TField>;
  name: TName;
}

export const FormPasswordInput = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  ...props
}: FormPasswordInputProps<TField, TName>): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
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
FormPasswordInput.displayName = "FormPasswordInput";
