"use client";

import { Button, TextInput } from "@/components";
import { ReactElement } from "react";

import { useLeads } from "./use-leads";

export const Leads = (): ReactElement => {
  const { control, onSubmit } = useLeads();

  return (
    <form
      className="flex flex-col gap-4 items-center w-full"
      onSubmit={onSubmit}
    >
      <TextInput
        label="Email Address"
        placeholder="Email Address"
        startIcon="mail"
        control={control}
        required
        type="email"
        autoComplete="email"
        name="email"
        className="w-3/4"
      />
      <Button onClick={onSubmit} startIcon="mail" type="submit">
        Join waitlist
      </Button>
    </form>
  );
};
