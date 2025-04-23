"use client";

import React from "react";

import { Button, FormInput, Form } from "@/components";
import { useLogin } from "./use-login";

export const LoginAuth = () => {
  const { isLoading, form, onSubmit } = useLogin();

  return (
    <Form {...form}>
      <form className="flex flex-col items-center w-full">
        <FormInput
          startIcon="mail"
          control={form.control}
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          label="Email Address"
        />
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
    </Form>
  );
};
