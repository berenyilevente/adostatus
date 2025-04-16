"use client";

import { ReactElement } from "react";

import { Button, CardContent, Icon, Label, TextInput } from "@/components";
import { config } from "@/config";

import { useLeads } from "./use-leads";

export const Leads = (): ReactElement => {
  const { control, onSubmit, submitted } = useLeads();

  return (
    <div className="min-w-1/3 max-w-lg mx-auto">
      <CardContent>
        {!submitted ? (
          <>
            <h3 className="text-center text-sm text-base-content/70 min-w-3/4 mx-auto">
              Sign up to get notified when {config.app.name} is ready with and
              secure your discount at launch.
            </h3>

            <div className="mt-1">
              <form
                className="flex flex-col gap-4 items-center w-full"
                onSubmit={onSubmit}
              >
                <div className="w-full">
                  <Label htmlFor="email">Email Address</Label>
                  <TextInput
                    placeholder="Email Address"
                    startIcon="mail"
                    control={control}
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
              </form>
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
    </div>
  );
};
