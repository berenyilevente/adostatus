'use client';

import { useState, useEffect } from 'react';

import { Calendar } from 'lucide-react';
import { useCalendar } from '../use-calendar';
import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  FormInput,
  FormDatepicker,
  FormWrapper,
  FormTimepicker,
  FormDateTimePicker,
} from '@/components';

export const AppointmentDialog = () => {
  const {
    appointmentForm,
    isAppointmentDialogOpen,
    setIsAppointmentDialogOpen,
    onAppointmentSubmit,
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
            <FormDateTimePicker
              control={appointmentForm.control}
              label="Start Date"
              name="start"
              modal
              placeholder="Select start date and time"
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
            <Button onClick={onAppointmentSubmit}>Save Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </FormWrapper>
    </Dialog>
  );
};
