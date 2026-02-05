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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FormMultiselect,
  FormTimepicker,
  Label,
} from '@/components';
import { useBusinessHours } from './use-business-hours';
import { daysOfWeek } from '../calendar/calendar.helper';

export const BusinessHoursDialog = () => {
  const {
    businessHoursForm,
    breakTimesForm,
    isBusinessHoursDialogOpen,
    businessName,
    setIsBusinessHoursDialogOpen,
    onSubmitBusinessHours,
    onSubmitBreakTimes,
    closeBusinessHoursDialog,
    isLoading,
  } = useBusinessHours();

  return (
    <Dialog
      open={isBusinessHoursDialogOpen}
      onOpenChange={setIsBusinessHoursDialogOpen}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div>Set your business hours and break times</div>
              <div className="text-sm font-normal text-muted-foreground">
                {businessName}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="business-hours" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="business-hours"
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Business Hours
            </TabsTrigger>
            <TabsTrigger
              value="break-times"
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Break Times
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business-hours">
            <FormWrapper form={businessHoursForm} className="space-y-2 pt-4">
              <div className="flex flex-col gap-1">
                <Label className="text-base">Business Hours</Label>
                <div className="text-muted-foreground text-sm">
                  Set the days and times that your business is open.
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FormMultiselect
                  control={businessHoursForm.control}
                  name="dayOfWeek"
                  options={daysOfWeek}
                  placeholder="Business days"
                />
                <div className="flex flex-row gap-2">
                  <FormTimepicker
                    control={businessHoursForm.control}
                    name="openTime"
                    placeholder="From"
                  />
                  <FormTimepicker
                    control={businessHoursForm.control}
                    name="closeTime"
                    placeholder="To"
                  />
                </div>
              </div>
            </FormWrapper>
            <DialogFooter className="pt-6">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={closeBusinessHoursDialog}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  onClick={onSubmitBusinessHours}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="break-times">
            <FormWrapper form={breakTimesForm} className="space-y-2 pt-4">
              <div className="flex flex-col gap-1">
                <Label className="text-base">Break Times</Label>
                <div className="text-muted-foreground text-sm">
                  Set the days and times that your business is closed.
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FormMultiselect
                  control={breakTimesForm.control}
                  name="dayOfWeek"
                  options={daysOfWeek}
                  placeholder="Break days"
                />
                <div className="flex flex-row gap-2">
                  <FormTimepicker
                    control={breakTimesForm.control}
                    name="startTime"
                    placeholder="From"
                  />
                  <FormTimepicker
                    control={breakTimesForm.control}
                    name="endTime"
                    placeholder="To"
                  />
                </div>
              </div>
            </FormWrapper>
            <DialogFooter className="pt-6">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={closeBusinessHoursDialog}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  onClick={onSubmitBreakTimes}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
