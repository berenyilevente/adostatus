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
  FormColorPicker,
  FileInput,
} from '@/components';
import { useCreateBusiness } from './use-create-business';
import { businessTypes } from '../business.helper';

export const CreateBusinessSheet = () => {
  const { form, onSubmit, isLoading } = useCreateBusiness();

  return (
    <Sheet modal>
      <SheetTrigger asChild id="create-business-sheet-trigger">
        <Button startIcon="plus" size="sm" iconSize="xs" color="primary">
          Create a new business
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-[500px]">
        <SheetHeader>
          <SheetTitle>Create a new business</SheetTitle>
          <SheetDescription>
            Create a new business by filling the basic information.
          </SheetDescription>
        </SheetHeader>
        <FormWrapper form={form} className="flex gap-4 flex-col w-full mt-6">
          <FormInput
            control={form.control}
            label="Business Name"
            name="name"
            placeholder="Enter your business name"
          />
          {form.watch('businessType') !== 'other' ? (
            <FormSelect
              control={form.control}
              label="Business Type"
              name="businessType"
              placeholder="Select your business type"
              options={businessTypes}
            />
          ) : (
            <FormInput
              control={form.control}
              label="Business Type"
              name="businessType"
              placeholder="Enter your business type"
            />
          )}
          <FormTextarea
            control={form.control}
            label="Description"
            name="description"
            placeholder="Tell us about your business..."
            className="resize-none"
          />
          <div>
            <FileInput
              onupdatefiles={() => {}}
              labelIdle="Add your business logo"
            />
          </div>
          <FormColorPicker
            control={form.control}
            name="primaryColor"
            label="Brand Color"
          />
          <Button onClick={onSubmit} isLoading={isLoading}>
            Create business
          </Button>
        </FormWrapper>
      </SheetContent>
    </Sheet>
  );
};
