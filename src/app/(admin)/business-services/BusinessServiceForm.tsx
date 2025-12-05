'use client';

import {
  FormWrapper,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from '@/components';
import { useBusinessServices } from './use-business-services';
import { currencies } from './business-services.helper';

export const BusinessServiceForm = () => {
  const { servicesForm } = useBusinessServices();

  return (
    <FormWrapper form={servicesForm} className="space-y-6">
      <div className="flex w-full justify-between gap-4">
        <FormInput
          control={servicesForm.control}
          label="Service Name"
          name="name"
          className="w-full"
          placeholder="Enter your service name"
        />
        <FormInput
          control={servicesForm.control}
          label="Price"
          name="price"
          type="number"
          className="w-full"
          placeholder="Enter your service price"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-2 gap-4">
        <FormSwitch
          control={servicesForm.control}
          label="Is Active"
          name="isActive"
        />
        <FormSelect
          control={servicesForm.control}
          label="Currency"
          name="currency"
          placeholder="Select your currency"
          options={currencies}
        />
      </div>
      <FormTextarea
        control={servicesForm.control}
        label="Service Description"
        name="description"
        placeholder="Enter your service description"
        className="resize-none"
      />
    </FormWrapper>
  );
};
