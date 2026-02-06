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
  SheetClose,
} from '@/components';
import { useRouter } from 'next/navigation';
import { useCreateBookingForm } from './use-create-booking-form';
import { useBookingForms } from '../use-booking-forms';

export const CreateBookingFormSheet = () => {
  const router = useRouter();
  const { createForm, onSubmitBookingForm, isLoading } = useCreateBookingForm();
  const { businessOptions, serviceOptions } = useBookingForms();

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
          <div className="flex items-center gap-2">
            <FormSelect
              control={createForm.control}
              label="Business"
              name="businessId"
              placeholder="Select business..."
              options={businessOptions}
              className="w-full"
            />
            {/* <SheetClose asChild onClick={() => router.push('/business/create')}>
              <Button
                variant="outline"
                fullWidth
                endIcon="plus"
                className="mt-8"
              >
                Add new business
              </Button>
            </SheetClose> */}
          </div>
          <FormSelect
            control={createForm.control}
            label="Service"
            name="serviceId"
            placeholder="Select a service..."
            options={serviceOptions}
            className="w-full"
            disabled={!createForm.watch('businessId')}
            actionButton={
              <SheetClose
                asChild
                onClick={() =>
                  router.push(
                    `/business/show/${createForm.watch('businessId')}`
                  )
                }
              >
                <Button
                  variant="outline"
                  fullWidth
                  endIcon="plus"
                  className="mt-8"
                >
                  Add new service
                </Button>
              </SheetClose>
            }
            noOptionsMessage="No services found for this business yet. Create a new service to get started."
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
          <Button onClick={onSubmitBookingForm} isLoading={isLoading}>
            Create form
          </Button>
        </FormWrapper>
      </SheetContent>
    </Sheet>
  );
};
