'use client';

import React from 'react';

import {
  Button,
  FileInput,
  FormInput,
  FormSelect,
  FormWrapper,
  FormColorPicker,
} from '@/components';

import { useCreateBusiness } from './use-create-business';

const CreateBusiness = () => {
  const { form, onSubmit, isLoading, businessTypes } = useCreateBusiness();

  return (
    <FormWrapper form={form} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FormInput
            control={form.control}
            label="Business Name"
            name="name"
            placeholder="Enter your business name"
          />
          <FormSelect
            control={form.control}
            label="Business Type"
            name="businessType"
            placeholder="Select your business type"
            options={businessTypes}
          />
          <FormInput
            control={form.control}
            label="Description"
            name="description"
            placeholder="Tell us about your business..."
            className="resize-none"
          />
          <FormInput
            control={form.control}
            label="Business hours"
            name="businessHours"
            placeholder="Tell us about your business hours..."
            className="resize-none"
          />
          <FormInput
            control={form.control}
            label="Services"
            name="services"
            placeholder="Select your services"
          />
        </div>

        <div className="space-y-6">
          <div className="filepond-file-upload">
            <FileInput
              onupdatefiles={() => {}}
              labelIdle={`<div>Add your business logo <span style="text-decoration: underline">Browse</span></div>`}
            />
          </div>
          <FormColorPicker
            control={form.control}
            name="primaryColor"
            label="Brand Color"
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export { CreateBusiness };
