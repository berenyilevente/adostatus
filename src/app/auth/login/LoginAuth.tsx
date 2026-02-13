'use client';

import React from 'react';

import { Button, FormInput, FormWrapper } from '@/components';

import { useLogin } from './use-login';

export const LoginAuth = () => {
  const { isLoading, form, onSubmit } = useLogin();

  return (
    <FormWrapper form={form} className="flex flex-col items-center gap-4">
      <FormInput
        startIcon="mail"
        control={form.control}
        id="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        label="Email Address"
        className="w-full"
      />
      <Button
        color="primary"
        isLoading={isLoading}
        onClick={onSubmit}
        fullWidth
      >
        Send login link
      </Button>
    </FormWrapper>
  );
};
