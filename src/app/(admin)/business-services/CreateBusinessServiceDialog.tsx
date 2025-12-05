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

const CreateServiceDialogAction = () => {
  const { handleClose, onSubmitService, isLoading } = useBusinessServices();

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
          isLoading={isLoading}
        >
          Save
        </Button>
      </div>
    </DialogFooter>
  );
};

const CreateServiceDialogHeader = () => {
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
            Business: {businessName}
          </div>
        </div>
      </DialogTitle>
    </DialogHeader>
  );
};

export const CreateBusinessServicesDialog = () => {
  const { isCreateServicesDialogOpen, setIsCreateServicesDialogOpen } =
    useBusinessServices();

  return (
    <Dialog
      open={isCreateServicesDialogOpen}
      onOpenChange={setIsCreateServicesDialogOpen}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <CreateServiceDialogHeader />
        <BusinessServiceForm />
        <CreateServiceDialogAction />
      </DialogContent>
    </Dialog>
  );
};
