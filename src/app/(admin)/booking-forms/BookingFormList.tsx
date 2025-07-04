'use client';

import { Button } from '@/components/ui/button';
import { ReactElement } from 'react';

import {
  CardContent,
  Card,
  FormWrapper,
  FormInput,
  FormSelect,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetHeader,
} from '@/components';
import { useRouter } from 'next/navigation';
import { useBookingForms } from './use-booking-forms';

export const BookingFormList = (): ReactElement => {
  const router = useRouter();
  const { filterForm, createForm, businessOptions, serviceOptions } =
    useBookingForms();
  const sample = [
    {
      id: '1',
      name: 'form 1',
      description: 'form 1 description',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full items-center gap-1 ">
        <FormWrapper form={filterForm} className="flex gap-4 items-center">
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
        <Sheet>
          <SheetTrigger asChild>
            <Button startIcon="plus" size="sm" iconSize="xs" color="primary">
              Create a new booking form
            </Button>
          </SheetTrigger>
          <SheetContent className="h-full w-[500px]">
            <SheetHeader>
              <SheetTitle>Create a new booking form</SheetTitle>
              <SheetDescription>
                Create a new booking form by selecting a business and a service
                and then giving it a name.
              </SheetDescription>
            </SheetHeader>
            <FormWrapper
              form={createForm}
              className="flex gap-4 flex-col w-full mt-6"
            >
              <FormSelect
                control={createForm.control}
                label="Business"
                name="business"
                placeholder="Select business..."
                options={businessOptions}
              />
              <FormSelect
                control={createForm.control}
                label="Service"
                name="service"
                placeholder="Select service..."
                options={serviceOptions}
              />
              <FormInput
                control={createForm.control}
                label="Title"
                name="title"
                placeholder="Enter form title"
              />
              <Button>Create form</Button>
            </FormWrapper>
          </SheetContent>
        </Sheet>
      </div>
      {sample.map((business) => (
        <Card className="bg-white" key={business.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium">{business.name}</p>
                <p className="text-xs text-gray-500">{business.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  endIcon="pencil"
                  variant="ghost"
                  onClick={() => router.push(`/booking-forms/${business.id}`)}
                />
                <Button size="icon" endIcon="trash" variant="ghost" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
