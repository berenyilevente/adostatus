import {
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  FormWrapper,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components';
import { Service } from '@/generated/prisma';
import { currencies } from '../business.helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServicesForm, ServicesSchema } from '../business.helper';
import { updateService } from '../actions/business.actions';
import { useState } from 'react';

interface EditServiceDialogProps {
  service: Service;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceUpdated: () => void;
}

export const EditServiceDialog = ({
  service,
  isOpen,
  onOpenChange,
  onServiceUpdated,
}: EditServiceDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const editServiceForm = useForm<ServicesForm>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: {
      businessId: service.businessId,
      name: service.name,
      description: service.description || '',
      isActive: service.isActive,
      currency: service.currency || '',
      duration: service.duration || '',
      bufferTime: service.bufferTime || '',
      price: service.price || '',
      color: service.color || null,
      formId: service.formId || null,
    },
  });

  const onEditServiceSubmit = editServiceForm.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await updateService(service.id, data);
      editServiceForm.reset();
      onOpenChange(false);
      onServiceUpdated();
    } catch (error) {
      console.error('Failed to update service:', error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleCancel = () => {
    editServiceForm.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <FormWrapper form={editServiceForm} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <FormInput
            control={editServiceForm.control}
            label="Service Name"
            name="name"
            placeholder="Enter your service name"
          />
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              control={editServiceForm.control}
              label="Price"
              name="price"
              type="number"
              placeholder="Enter your service price"
            />
            <FormSelect
              control={editServiceForm.control}
              label="Currency"
              name="currency"
              placeholder="Select your currency"
              options={currencies}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormSwitch
              control={editServiceForm.control}
              label="Is Active"
              name="isActive"
            />
            <FormInput
              control={editServiceForm.control}
              label="Duration"
              name="duration"
              placeholder="Enter your service duration"
            />
            <FormInput
              control={editServiceForm.control}
              label="Buffer Time"
              name="bufferTime"
              placeholder="Enter your service buffer time"
            />
          </div>
          <FormTextarea
            control={editServiceForm.control}
            label="Service Description"
            name="description"
            placeholder="Enter your service description"
            className="resize-none"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={onEditServiceSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Service'}
            </Button>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
