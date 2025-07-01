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
} from '@/components';

import { useEditBusiness } from './use-edit-business';
import { Label } from '@radix-ui/react-label';
import { PlusIcon } from 'lucide-react';
import { FormMultiselect } from '@/components/form/form-multiselect';
import { businessTypes } from '../business.helper';

const EditBusiness = () => {
  const {
    form,
    onSubmit,
    isLoading,
    servicesForm,
    handleServicesSubmit,
    services,
  } = useEditBusiness();

  const daysOfWeek = [
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
    { label: 'Saturday', value: 'saturday' },
    { label: 'Sunday', value: 'sunday' },
  ];

  // TODO: create a supported currencies list
  const currencies = [
    { label: 'USD', value: 'usd' },
    { label: 'EUR', value: 'eur' },
    { label: 'GBP', value: 'gbp' },
    { label: 'CAD', value: 'cad' },
    { label: 'AUD', value: 'aud' },
  ];

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

          {/* Services */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>
                  Configure your the services you offer.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 gap-0">
                <div className="space-y-2">
                  {services.map((service) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-bold">Service Name</Label>
                      <p>{service.name}</p>
                    </div>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" endIcon="plus" fullWidth>
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <FormWrapper form={servicesForm} className="space-y-6">
                      <DialogHeader>
                        <DialogTitle>Add Service</DialogTitle>
                      </DialogHeader>
                      <FormInput
                        control={servicesForm.control}
                        label="Service Name"
                        name="name"
                        placeholder="Enter your service name"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <FormInput
                          control={servicesForm.control}
                          label="Price"
                          name="price"
                          type="number"
                          placeholder="Enter your service price"
                        />
                        <FormSelect
                          control={servicesForm.control}
                          label="Currency"
                          name="currency"
                          placeholder="Select your currency"
                          options={currencies}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <FormInput
                          control={servicesForm.control}
                          label="Duration"
                          name="duration"
                          placeholder="Enter your service duration"
                        />
                        <FormInput
                          control={servicesForm.control}
                          label="Buffer Time"
                          name="bufferTime"
                          placeholder="Enter your service buffer time"
                        />
                      </div>
                      <FormTextarea
                        control={servicesForm.control}
                        label="Service Description"
                        name="description"
                        placeholder="Enter your service description"
                        className="resize-none"
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            onClick={() => servicesForm.reset()}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleServicesSubmit}>
                          Add Service
                        </Button>
                      </DialogFooter>
                    </FormWrapper>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export { EditBusiness };
