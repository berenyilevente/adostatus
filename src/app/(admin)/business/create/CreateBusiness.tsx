'use client';

import React from 'react';

import {
  Button,
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
} from '@/components';

import { useCreateBusiness } from './use-create-business';
import { Label } from '@radix-ui/react-label';
import { FormMultiselect } from '@/components/form/form-multiselect';
import { businessTypes, daysOfWeek } from '../business.helper';

const CreateBusiness = () => {
  const { form, onSubmit, isLoading } = useCreateBusiness();

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
                name="business.name"
                placeholder="Enter your business name"
              />
              {form.watch('business.businessType') !== 'other' ? (
                <FormSelect
                  control={form.control}
                  label="Business Type"
                  name="business.businessType"
                  placeholder="Select your business type"
                  options={businessTypes}
                />
              ) : (
                <FormInput
                  control={form.control}
                  label="Business Type"
                  name="business.businessType"
                  placeholder="Enter your business type"
                />
              )}
              <FormTextarea
                control={form.control}
                label="Description"
                name="business.description"
                placeholder="Tell us about your business..."
                className="resize-none"
              />
              <div className="filepond-file-upload">
                <FileInput
                  onupdatefiles={() => {}}
                  labelIdle={`<div>Add your business logo <span style="text-decoration: underline">Browse</span></div>`}
                />
              </div>
              <FormColorPicker
                control={form.control}
                name="business.primaryColor"
                label="Brand Color"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Hours */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Hours</CardTitle>
                <CardDescription>
                  Configure your business hours and break times for each day of
                  the week.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 gap-0">
                <div>
                  <Label className="text-sm font-bold">Business Hours</Label>
                  <FormMultiselect
                    control={form.control}
                    name="businessHours.dayOfWeek"
                    options={daysOfWeek}
                    placeholder="Days of the week"
                  />
                  <div className="flex flex-row gap-2">
                    <FormTimepicker
                      control={form.control}
                      name="businessHours.openTime"
                      placeholder="From"
                    />
                    <FormTimepicker
                      control={form.control}
                      name="businessHours.closeTime"
                      placeholder="To"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-bold">Break Times</Label>
                  <FormMultiselect
                    control={form.control}
                    name="breakTimes.dayOfWeek"
                    options={daysOfWeek}
                    placeholder="Days of the week"
                  />
                  <div className="flex flex-row gap-2 items-center">
                    <FormTimepicker
                      control={form.control}
                      name="breakTimes.startTime"
                      placeholder="From"
                    />
                    <FormTimepicker
                      control={form.control}
                      name="breakTimes.endTime"
                      placeholder="To"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export { CreateBusiness };
