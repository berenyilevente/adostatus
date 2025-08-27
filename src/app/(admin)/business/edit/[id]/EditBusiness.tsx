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
  FileInput,
} from '@/components';

import { useEditBusiness } from './use-edit-business';
import { businessTypes } from '../../business.helper';
import { useRouter } from 'next/navigation';

const EditBusiness = () => {
  const router = useRouter();
  const { businessForm, onBusinessSave, handleBack, isLoading } =
    useEditBusiness();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center space-x-2"
            startIcon="arrowLeft"
          >
            <span>Back</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={onBusinessSave}
            className="w-full"
            size="sm"
            type="button"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
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
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <FileInput
                  onupdatefiles={() => {}}
                  labelIdle="Add your business logo"
                />
              </div>
              <FormColorPicker
                control={businessForm.control}
                name="primaryColor"
                label="Brand Color"
              />
            </CardContent>
          </Card>
        </div>
      </FormWrapper>
    </div>
  );
};

export { EditBusiness };
