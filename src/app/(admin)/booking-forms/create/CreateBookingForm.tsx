'use client';

import {
  Button,
  FormInput,
  FormSelect,
  FormTextarea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  FormWrapper,
} from '@/components';
import { useRouter } from 'next/navigation';
import { useCreateBookingForm } from './use-create-booking-form';
import { useBookingForms } from '../use-booking-forms';

export const CreateBookingForm = () => {
  const router = useRouter();
  const { createForm, onSubmitBookingForm } = useCreateBookingForm();
  const { businessOptions } = useBookingForms();

  return (
    <Sheet modal>
      <SheetTrigger asChild id="create-booking-form-trigger">
        <Button startIcon="plus" size="sm" iconSize="xs" color="primary">
          Create a new booking form
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-[500px]">
        <SheetHeader>
          <SheetTitle>Create a new booking form</SheetTitle>
          <SheetDescription>
            Create a new booking form by selecting a business and a service and
            then giving it a name.
          </SheetDescription>
        </SheetHeader>
        <FormWrapper
          form={createForm}
          className="flex gap-4 flex-col w-full mt-6"
        >
          <FormSelect
            control={createForm.control}
            label="Business"
            name="businessId"
            placeholder="Select business..."
            options={businessOptions}
            actionButton={
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => router.push('/business/create')}
                endIcon="plus"
              >
                Create a new business
              </Button>
            }
          />
          <FormInput
            control={createForm.control}
            label="Name"
            name="name"
            placeholder="Enter form name"
          />
          <FormTextarea
            control={createForm.control}
            label="Description"
            name="description"
            placeholder="Enter form description"
          />
          <Button onClick={onSubmitBookingForm}>Create form</Button>
        </FormWrapper>
      </SheetContent>
    </Sheet>
  );
};
