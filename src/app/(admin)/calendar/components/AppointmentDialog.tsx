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
            <div className="grid grid-cols-2 gap-4">
              <FormDatepicker
                control={appointmentForm.control}
                label="Start Date"
                name="start"
                modal
              />
              <FormTimepicker
                control={appointmentForm.control}
                label="Start Time"
                name="start"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormDatepicker
                control={appointmentForm.control}
                label="End Date"
                name="end"
                modal
              />
              <FormTimepicker
                control={appointmentForm.control}
                label="End Time"
                name="end"
              />
            </div>
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
