'use client';

import { Form } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';

type HookProp = {
  formsData: Form[];
};

function useCreateBookingFormHook({ formsData }: HookProp) {
  return {};
}

export const [useCreateBookingForm, CreateBookingFormProvider] =
  createAppContext(useCreateBookingFormHook);
