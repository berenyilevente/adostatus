'use client';

import { Button } from '@/components/ui/button';
import { ReactElement } from 'react';

import {
  CardContent,
  Card,
  TableSearch,
  FormWrapper,
  FormInput,
  FormSelect,
} from '@/components';
import { useRouter } from 'next/navigation';
import { useBookingForms } from './use-booking-forms';

export const BookingFormList = (): ReactElement => {
  const router = useRouter();
  const { filterForm, businessData } = useBookingForms();
  const sample = ['form 1', 'form 2', 'form 3'];

  const businessOptions = businessData.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full items-center gap-1 ">
        <FormWrapper form={filterForm} className="flex gap-4">
          <FormInput
            startIcon="search"
            control={filterForm.control}
            id="search"
            name="search"
            placeholder="Search booking forms..."
          />
          <FormSelect
            control={filterForm.control}
            name="business"
            placeholder="Select business..."
            options={businessOptions}
          />
        </FormWrapper>
        <Button
          startIcon="plus"
          size="sm"
          iconSize="xs"
          variant="default"
          color="primary"
          onClick={() => router.push('/booking-forms/create')}
        >
          Create a new booking form
        </Button>
      </div>
      {sample.map((sam) => (
        <Card className="bg-white" key={sam}>
          <CardContent className="p-4">{sam}</CardContent>
        </Card>
      ))}
    </div>
  );
};
