'use client';

import { ReactElement } from 'react';

import { useCreateBookingForm } from './use-create-booking-form';

export const FormBuilder = (): ReactElement => {
  const {} = useCreateBookingForm();

  return <div>s</div>;
};
