'use client';

import React from 'react';

import { Button, FormInput, FormRadioGroup, FormWrapper, Label } from '@/components';

import { usePurchase } from './use-purchase';
import Link from 'next/link';

export const Purchase = () => {
  const { isLoading, form, onSubmit } = usePurchase();

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
      <Button color="primary" isLoading={isLoading} onClick={onSubmit} fullWidth>
        Continue
      </Button>
      <div className="text-sm text-base-content/70 space-x-1">
        <span>Already have an account?</span>
        <Link href="/auth/login" className="text-primary">
          Login
        </Link>
      </div>
    </FormWrapper>
  );
};
