'use client';

import { Calendar, Clock } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  FormWrapper,
  Separator,
  FormMultiselect,
  FormTimepicker,
} from '@/components';
import { useBusinessHours } from './use-business-hours';
import { daysOfWeek } from '../calendar/calendar.helper';

export const BusinessHours = () => {
  const {
    businessHoursForm,
    isBusinessHoursDialogOpen,
    setIsBusinessHoursDialogOpen,
    businessName,
    onSubmitBusinessHours,
  } = useBusinessHours();

  const handleClose = () => {
    businessHoursForm.reset();
    setIsBusinessHoursDialogOpen(false);
  };

  return (
    <Dialog
      open={isBusinessHoursDialogOpen}
      onOpenChange={setIsBusinessHoursDialogOpen}
    >
      <FormWrapper form={businessHoursForm} className="space-y-0">
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

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Business Hours
              </div>
              <FormMultiselect
                control={businessHoursForm.control}
                name="businessHours.dayOfWeek"
                options={daysOfWeek}
                placeholder="Days of the week"
              />
              <div className="flex flex-row gap-2">
                <FormTimepicker
                  control={businessHoursForm.control}
                  name="businessHours.openTime"
                  placeholder="From"
                />
                <FormTimepicker
                  control={businessHoursForm.control}
                  name="businessHours.closeTime"
                  placeholder="To"
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Break Times
              </div>
              <FormMultiselect
                control={businessHoursForm.control}
                name="breakTimes.dayOfWeek"
                options={daysOfWeek}
                placeholder="Days of the week"
              />
              <div className="flex flex-row gap-2">
                <FormTimepicker
                  control={businessHoursForm.control}
                  name="breakTimes.startTime"
                  placeholder="From"
                />
                <FormTimepicker
                  control={businessHoursForm.control}
                  name="breakTimes.endTime"
                  placeholder="To"
                />
              </div>
            </div>
          </div>

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
                onClick={onSubmitBusinessHours}
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </FormWrapper>
    </Dialog>
  );
};
