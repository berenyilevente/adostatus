'use client';

import React from 'react';

import {
  FileInput,
  FormInput,
  FormSelect,
  FormWrapper,
  FormColorPicker,
  FormTextarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormTimepicker,
  CardDescription,
  Button,
} from '@/components';

import { useCreateBusiness } from './use-create-business';
import { Label } from '@radix-ui/react-label';
import { FormMultiselect } from '@/components/form/form-multiselect';
import { businessTypes } from '../business.helper';

const CreateBusiness = () => {
  const { form, onSubmit, isLoading, handleChangeImage, handleCancel } =
    useCreateBusiness();

  return (
    <FormWrapper form={form} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="gap-0">
            <div className="space-y-6">
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
              <div className="w-full">
                <Label className="text-sm font-semibold">Logo</Label>
                <FileInput
                  onupdatefiles={handleChangeImage}
                  labelIdle={'Add your business logo'}
                />
              </div>
              <FormColorPicker
                control={form.control}
                name="primaryColor"
                label="Brand Color"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="default" size="sm" onClick={onSubmit}>
          Save
        </Button>
      </div>
    </FormWrapper>
  );
};

export { CreateBusiness };
