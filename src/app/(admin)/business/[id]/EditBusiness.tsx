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
} from '@/components';

import { useEditBusiness } from './use-edit-business';
import { Label } from '@radix-ui/react-label';
import { PlusIcon } from 'lucide-react';
import { FormMultiselect } from '@/components/form/form-multiselect';
import { businessTypes } from '../business.helper';
import { useRouter } from 'next/navigation';

const EditBusiness = () => {
  const router = useRouter();
  const {
    businessForm,
    onBusinessSubmit,
    isLoading,
    servicesForm,
    onServicesSubmit,
    services,
    isServicesModalOpen,
    setIsServicesModalOpen,
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
              <div className="filepond-file-upload">
                <FileInput
                  onupdatefiles={() => {}}
                  labelIdle={`<div>Add your business logo <span style="text-decoration: underline">Browse</span></div>`}
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
                  {services.map((service, index) => (
                    <Card className="bg-white" key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-col">
                            <p className="text-sm font-medium">
                              {service.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p>{service.price}</p>
                            <p>{service.currency}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Dialog open={isServicesModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      endIcon="plus"
                      fullWidth
                      onClick={() => setIsServicesModalOpen(true)}
                    >
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
                        <FormSwitch
                          control={servicesForm.control}
                          label="Is Active"
                          name="isActive"
                        />
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
                            onClick={() => {
                              servicesForm.reset();
                              setIsServicesModalOpen(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" onClick={onServicesSubmit}>
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
      <div className="flex flex-row gap-6 justify-end">
        <Button
          variant="outline"
          startIcon="chevronLeft"
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
