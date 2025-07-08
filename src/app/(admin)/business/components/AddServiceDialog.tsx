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
  DialogTrigger,
} from '@/components';
import { useShowBusiness } from '../show/[id]/use-show-business';
import { currencies } from '../business.helper';

export const AddServiceDialog = () => {
  const {
    isServicesModalOpen,
    setIsServicesModalOpen,
    servicesForm,
    onServicesSubmit,
  } = useShowBusiness();

  return (
    <Dialog open={isServicesModalOpen} onOpenChange={setIsServicesModalOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          endIcon="plus"
          fullWidth
          onClick={() => setIsServicesModalOpen(true)}
          variant="outline"
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
  );
};
