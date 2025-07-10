'use client';

import { Calendar, User, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { useCalendar } from '../use-calendar';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  FormInput,
  FormWrapper,
  FormDateTimePicker,
  FormSelect,
  DialogDescription,
  Separator,
  FormCheckbox,
  FormSwitch,
  FormColorPicker,
} from '@/components';

export const AppointmentDialog = () => {
  const {
    appointmentForm,
    isAppointmentDialogOpen,
    setIsAppointmentDialogOpen,
    onAppointmentSubmit,
    teamMemberOptions,
    serviceOptions,
    statusOptions,
    businessName,
  } = useCalendar();

  const handleClose = () => {
    appointmentForm.reset();
    setIsAppointmentDialogOpen(false);
  };

  return (
    <Dialog
      open={isAppointmentDialogOpen}
      onOpenChange={setIsAppointmentDialogOpen}
    >
      <FormWrapper form={appointmentForm} className="space-y-0">
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div>Create Appointment</div>
                <div className="text-sm font-normal text-muted-foreground">
                  {businessName}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Basic Information
              </div>
              <div className="grid gap-4">
                <FormInput
                  control={appointmentForm.control}
                  name="title"
                  placeholder="Appointment Title"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    control={appointmentForm.control}
                    placeholder="Select Team Member"
                    name="teamMemberId"
                    options={teamMemberOptions}
                  />
                  <FormSelect
                    control={appointmentForm.control}
                    placeholder="Select Service"
                    name="serviceId"
                    options={serviceOptions}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    control={appointmentForm.control}
                    name="status"
                    options={statusOptions}
                    placeholder="Select Status"
                  />
                  <FormColorPicker
                    control={appointmentForm.control}
                    name="backgroundColor"
                    placeholder="Select Color"
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Schedule
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormDateTimePicker
                  control={appointmentForm.control}
                  name="start"
                  modal
                  placeholder="Select start date and time"
                />
                <FormDateTimePicker
                  control={appointmentForm.control}
                  name="end"
                  modal
                  placeholder="Select end date and time"
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-muted-foreground" />
                Customer Information
              </div>
              <div className="grid gap-4">
                <FormInput
                  control={appointmentForm.control}
                  name="customerName"
                  placeholder="Name"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    control={appointmentForm.control}
                    name="customerEmail"
                    placeholder="Email"
                    type="email"
                  />
                  <FormInput
                    control={appointmentForm.control}
                    name="customerPhone"
                    placeholder="Phone"
                    type="tel"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6">
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={onAppointmentSubmit}
                className="flex-1"
              >
                Create Appointment
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </FormWrapper>
    </Dialog>
  );
};
