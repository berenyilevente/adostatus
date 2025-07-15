'use client';

import { Calendar } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components';
import { useBusinessServices } from './use-business-services';
import { BusinessServiceForm } from './BusinessServiceForm';

const EditServiceDialogHeader = () => {
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

const EditServiceDialogAction = () => {
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

export const EditBusinessServicesDialog = () => {
  const { isEditServicesDialogOpen, setIsEditServicesDialogOpen } =
    useBusinessServices();

  return (
    <Dialog
      open={isEditServicesDialogOpen}
      onOpenChange={setIsEditServicesDialogOpen}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <EditServiceDialogHeader />
        <BusinessServiceForm />
        <EditServiceDialogAction />
      </DialogContent>
    </Dialog>
  );
};
