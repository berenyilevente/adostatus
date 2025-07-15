'use client';

import { Calendar } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  FormWrapper,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from '@/components';
import { useBusinessServices } from './use-business-services';
import { currencies } from './business-services.helper';

export const BusinessServicesDialog = () => {
  const {
    servicesForm,
    isServicesDialogOpen,
    businessName,
    onSubmitService,
    handleClose,
    setIsServicesDialogOpen,
  } = useBusinessServices();

  return (
    <Dialog open={isServicesDialogOpen} onOpenChange={setIsServicesDialogOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div>Set your business hours</div>
              <div className="text-sm font-normal text-muted-foreground">
                {businessName}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

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
          <DialogFooter className="pt-6">
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                size="sm"
                onClick={onSubmitService}
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
