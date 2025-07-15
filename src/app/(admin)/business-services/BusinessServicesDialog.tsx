'use client';

import { PropsWithChildren } from 'react';
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

export const BusinessServicesDialog = ({ children }: PropsWithChildren) => {
  const { isServicesDialogOpen, setIsServicesDialogOpen } =
    useBusinessServices();

  return (
    <Dialog open={isServicesDialogOpen} onOpenChange={setIsServicesDialogOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
};

BusinessServicesDialog.CreateServiceDialogHeader = () => {
  const { businessName } = useBusinessServices();
  return (
    <DialogHeader className="pb-4">
      <DialogTitle className="flex items-center gap-3 text-xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div>Add a new service</div>
          <div className="text-sm font-normal text-muted-foreground">
            {businessName}
          </div>
        </div>
      </DialogTitle>
    </DialogHeader>
  );
};

BusinessServicesDialog.EditServiceDialogHeader = () => {
  const { businessName } = useBusinessServices();
  return (
    <DialogHeader className="pb-4">
      <DialogTitle className="flex items-center gap-3 text-xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div>Edit service</div>
          <div className="text-sm font-normal text-muted-foreground">
            {businessName}
          </div>
        </div>
      </DialogTitle>
    </DialogHeader>
  );
};

BusinessServicesDialog.ServiceForm = () => {
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

BusinessServicesDialog.CreateServiceDialogAction = () => {
  const { handleClose, onSubmitService } = useBusinessServices();

  return (
    <DialogFooter>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleClose}>
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
  );
};

BusinessServicesDialog.EditServiceDialogAction = () => {
  const { handleClose, onSubmitEditService } = useBusinessServices();

  return (
    <DialogFooter>
      <div className="flex justify-between pt-6 w-full">
        <Button type="button" variant="destructive" size="sm">
          Delete Service
        </Button>
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
            onClick={onSubmitEditService}
          >
            Save
          </Button>
        </div>
      </div>
    </DialogFooter>
  );
};
