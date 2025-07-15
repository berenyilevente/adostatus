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
    </FormWrapper>
  );
};
