'use client';

import React from 'react';

import {
  Button,
  Card,
  CardContent,
  FileInput,
  FormColorPicker,
  FormInput,
  FormMultiselect,
  FormSelect,
  FormTextarea,
  FormTimepicker,
  FormWrapper,
  Label,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components';
import { businessTypes, daysOfWeek } from './business.helper';

import { useBusiness } from './use-business';
import { useRouter } from 'next/navigation';

export const BusinessList = () => {
  const router = useRouter();
  const {
    businessData,
    filterForm,
    form,
    onSubmit,
    handleCancel,
    handleChangeImage,
    isLoading,
    isCreateSheetOpen,
    setIsCreateSheetOpen,
  } = useBusiness();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full items-center gap-1 ">
        <FormWrapper form={filterForm} className="flex gap-4">
          <FormInput
            startIcon="search"
            control={filterForm.control}
            id="search"
            name="search"
            placeholder="Search businesses..."
          />
        </FormWrapper>
        <Button
          startIcon="plus"
          size="sm"
          iconSize="xs"
          variant="default"
          color="primary"
          onClick={() => setIsCreateSheetOpen(true)}
        >
          Add Business
        </Button>
      </div>
      {businessData.map((business) => (
        <Card className="bg-white" key={business.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium">{business.name}</p>
                <p className="text-xs text-gray-500">{business.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" endIcon="plus" variant="outline" fullWidth>
                  Add services
                </Button>
                <Button
                  size="icon"
                  endIcon="pencil"
                  variant="ghost"
                  onClick={() => router.push(`/business/${business.id}`)}
                />
                <Button size="icon" endIcon="trash" variant="ghost" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
        <SheetContent className="overflow-y-auto w-[400px]">
          <SheetHeader>
            <SheetTitle>Business details</SheetTitle>
          </SheetHeader>
          <FormWrapper form={form} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
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
                <div className="w-full">
                  <Label className="text-sm font-semibold">Logo</Label>
                  <FileInput
                    onupdatefiles={() => {}}
                    labelIdle={'Add your business logo'}
                  />
                </div>
                <FormColorPicker
                  control={form.control}
                  name="business.primaryColor"
                  label="Brand Color"
                />
              </div>

              {/* Hours */}
              <div className="space-y-6">
                <div className="space-y-6 gap-0">
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
                </div>
              </div>
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
              <Button
                type="submit"
                variant="default"
                size="sm"
                onClick={onSubmit}
              >
                Save
              </Button>
            </div>
          </FormWrapper>
        </SheetContent>
      </Sheet>
    </div>
  );
};
