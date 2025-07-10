import { Appointment as AppointmentTable } from '@/generated/prisma';
import { z } from 'zod';

type Appointment = Omit<AppointmentTable, 'id' | 'createdAt' | 'updatedAt'>;

export const AppointmentSchema: z.ZodType<Appointment> = z.object({
  businessId: z.string(),
  serviceId: z.string().min(1, 'Service is required'),
  teamMemberId: z.string().min(1, 'Team member is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(1, 'Customer phone is required'),
  title: z.string().min(2, 'Appointment title must be at least 2 characters'),
  description: z.string().nullable(),
  start: z.date(),
  end: z.date(),
  status: z.string(),
  notes: z.string().nullable(),
  formData: z.string().nullable(),
  backgroundColor: z.string().nullable(),
});

export type CreateAppointment = z.infer<typeof AppointmentSchema>;

// TODO Replace this with the Appointment type
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
  description: string;
}
