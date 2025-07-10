'use client';

import { Calendar } from 'lucide-react';
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
  } = useCalendar();

  const handleClose = () => {
    setIsAppointmentDialogOpen(false);
  };

  return (
    <Dialog
      open={isAppointmentDialogOpen}
      onOpenChange={setIsAppointmentDialogOpen}
    >
      <FormWrapper form={appointmentForm} className="space-y-6">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Create Appointment
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormInput
              control={appointmentForm.control}
              label="Title"
              name="title"
              placeholder="Enter event title"
            />
            <FormSelect
              control={appointmentForm.control}
              label="Team Member"
              name="teamMemberId"
              options={teamMemberOptions}
            />
            <FormSelect
              control={appointmentForm.control}
              label="Service"
              name="serviceId"
              options={serviceOptions}
            />
            <FormDateTimePicker
              control={appointmentForm.control}
              label="Start Date"
              name="start"
              modal
              placeholder="Select start date and time"
            />
            <FormInput
              control={appointmentForm.control}
              label="Customer Name"
              name="customerName"
              placeholder="Enter customer name"
            />
            <FormInput
              control={appointmentForm.control}
              label="Customer Email"
              name="customerEmail"
              placeholder="Enter customer email"
            />
            <FormInput
              control={appointmentForm.control}
              label="Customer Phone"
              name="customerPhone"
              placeholder="Enter customer phone"
            />
            <FormSelect
              control={appointmentForm.control}
              label="Status"
              name="status"
              options={statusOptions}
            />
            <FormDateTimePicker
              control={appointmentForm.control}
              label="End Date"
              name="end"
              modal
              placeholder="Select end date and time"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={onAppointmentSubmit}>
              Save Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormWrapper>
    </Dialog>
  );
};
