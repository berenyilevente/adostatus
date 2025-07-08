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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  CardDescription,
  FormSwitch,
  AvatarInput,
} from '@/components';

import { useEditBusiness } from './use-edit-business';
import { Label } from '@radix-ui/react-label';
import { PlusIcon } from 'lucide-react';
import { FormMultiselect } from '@/components/form/form-multiselect';
import { businessTypes, daysOfWeek } from '../../business.helper';
import { useRouter } from 'next/navigation';

const EditBusiness = () => {
  const router = useRouter();
  const { businessForm, onBusinessSubmit, services } = useEditBusiness();

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
                name="business.name"
                placeholder="Enter your business name"
              />
              {businessForm.watch('business.businessType') !== 'other' ? (
                <FormSelect
                  control={businessForm.control}
                  label="Business Type"
                  name="business.businessType"
                  placeholder="Select your business type"
                  options={businessTypes}
                />
              ) : (
                <FormInput
                  control={businessForm.control}
                  label="Business Type"
                  name="business.businessType"
                  placeholder="Enter your business type"
                />
              )}
              <FormTextarea
                control={businessForm.control}
                label="Description"
                name="business.description"
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
                name="business.primaryColor"
                label="Brand Color"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
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
                    control={businessForm.control}
                    name="businessHours.dayOfWeek"
                    options={daysOfWeek}
                    placeholder="Days of the week"
                  />
                  <div className="flex flex-row gap-2">
                    <FormTimepicker
                      control={businessForm.control}
                      name="businessHours.openTime"
                      placeholder="From"
                    />
                    <FormTimepicker
                      control={businessForm.control}
                      name="businessHours.closeTime"
                      placeholder="To"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-bold">Break Times</Label>
                  <FormMultiselect
                    control={businessForm.control}
                    name="breakTimes.dayOfWeek"
                    options={daysOfWeek}
                    placeholder="Days of the week"
                  />
                  <div className="flex flex-row gap-2 items-center">
                    <FormTimepicker
                      control={businessForm.control}
                      name="breakTimes.startTime"
                      placeholder="From"
                    />
                    <FormTimepicker
                      control={businessForm.control}
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
