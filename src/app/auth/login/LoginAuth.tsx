"use client";

import React from "react";

import { Button, Label, TextInput } from "@/components";
import { useLogin } from "./use-login";

export const LoginAuth = () => {
  const { isLoading, control, onSubmit } = useLogin();

  return (
    <form className="flex flex-col  items-center w-full">
      <div className="form-control w-3/4">
        <Label htmlFor="email">Email Address</Label>
        <TextInput
          startIcon="mail"
          control={control}
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
        />
      </div>
      <div className="mt-4 md:mt-6">
        <Button
          color="primary"
          isLoading={isLoading}
          onClick={onSubmit}
          className="gap-3 text-base"
          fullWidth
          startIcon="login"
        >
          Send Login Link
        </Button>
      </div>
    </form>
  );
};
