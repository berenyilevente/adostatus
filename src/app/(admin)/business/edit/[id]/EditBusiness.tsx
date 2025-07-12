'use client';

import React from 'react';

import {
  Button,
  FormInput,
  FormSelect,
  FormWrapper,
  FormColorPicker,
  FormTextarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  AvatarInput,
} from '@/components';

import { useEditBusiness } from './use-edit-business';
import { businessTypes } from '../../business.helper';
import { useRouter } from 'next/navigation';

const EditBusiness = () => {
  const router = useRouter();
  const { businessForm, onBusinessSubmit } = useEditBusiness();

  return (
    <FormWrapper form={businessForm} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="gap-0">
            <div className="space-y-6">
              <FormInput
                control={businessForm.control}
                label="Business Name"
                name="name"
                placeholder="Enter your business name"
              />
              {businessForm.watch('businessType') !== 'other' ? (
                <FormSelect
                  control={businessForm.control}
                  label="Business Type"
                  name="businessType"
                  placeholder="Select your business type"
                  options={businessTypes}
                />
              ) : (
                <FormInput
                  control={businessForm.control}
                  label="Business Type"
                  name="businessType"
                  placeholder="Enter your business type"
                />
              )}
              <FormTextarea
                control={businessForm.control}
                label="Description"
                name="description"
                placeholder="Tell us about your business..."
                className="resize-none"
              />
              <div>
                <AvatarInput
                  onupdatefiles={() => {}}
                  labelIdle="Add your business logo"
                />
              </div>
              <FormColorPicker
                control={businessForm.control}
                name="primaryColor"
                label="Brand Color"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-row gap-6 justify-end">
        <Button
          variant="outline"
          startIcon="chevronLeft"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button startIcon="check" onClick={onBusinessSubmit}>
          Save
        </Button>
      </div>
    </FormWrapper>
  );
};

export { EditBusiness };
