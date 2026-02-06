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
  DialogDescription,
} from '@/components';
import { Service } from '@/generated/prisma';
import { currencies } from '../business.helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServicesForm, ServicesSchema } from '../business.helper';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  deleteService,
  updateService,
} from '../../business-services/actions/business-services.actions';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      teamMemberId: service.teamMemberId,
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

  const handleDeleteService = async () => {
    setIsDeleting(true);
    try {
      await deleteService(service.id, service.businessId);
      setShowDeleteConfirm(false);
      onOpenChange(false);
      onServiceUpdated();
    } catch (error) {
      console.error('Failed to delete service:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    editServiceForm.reset();
    onOpenChange(false);
  };

  return (
    <>
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
            <DialogFooter className="flex justify-between">
              <Button
                variant="destructive"
                size="sm"
                disabled={isLoading}
                type="button"
                className="flex items-center gap-2"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="h-4 w-4" />
                Delete Service
              </Button>
              <div className="flex gap-2">
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
              </div>
            </DialogFooter>
          </FormWrapper>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              service "{service.name}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteService}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Service'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
