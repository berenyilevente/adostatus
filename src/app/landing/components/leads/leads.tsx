'use client';

import { ReactElement } from 'react';

import {
  Button,
  CardContent,
  Icon,
  Label,
  FormInput,
  FormWrapper,
} from '@/components';
import { config } from '@/config';

import { useLeads } from './use-leads';

export const Leads = (): ReactElement => {
  const { form, onSubmit, submitted } = useLeads();

  return (
    <FormWrapper form={form} className="min-w-1/3 max-w-lg mx-auto">
      <CardContent>
        {!submitted ? (
          <>
            <h3 className="text-center text-sm text-base-content/70 min-w-3/4 mx-auto">
              Sign up to get notified when {config.app.name} is ready and secure
              your discount at launch.
            </h3>

            <div className="mt-1 flex flex-col gap-4 items-center w-full">
              <div className="w-full">
                <Label htmlFor="email">Email Address</Label>
                <FormInput
                  placeholder="Email Address"
                  startIcon="mail"
                  control={form.control}
                  required
                  type="email"
                  autoComplete="email"
                  name="email"
                />
              </div>
              <Button
                onClick={onSubmit}
                startIcon="mail"
                fullWidth
                type="submit"
              >
                Join waitlist
              </Button>
            </div>
          </>
        ) : (
          <div className="text-sm flex flex-col gap-2 items-center text-base-content/70">
            <div className="flex items-center gap-2">
              Thanks for signing up!
              <Icon icon="check" className="text-green-500" />
            </div>
            <div>We&apos;ll be in touch when we launch.</div>
          </div>
        )}
      </CardContent>
    </FormWrapper>
  );
};
