import { Appointment as AppointmentTable } from '@/generated/prisma';
import { z } from 'zod';

type Appointment = Omit<AppointmentTable, 'id' | 'createdAt' | 'updatedAt'>;

export const AppointmentSchema: z.ZodType<Appointment> = z.object({
  businessId: z.string(),
  serviceId: z.string(),
  teamMemberId: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  title: z.string().min(2, 'Appointment title must be at least 2 characters'),
  description: z.string().nullable(),
  start: z.string(),
  end: z.string(),
  status: z.string(),
  notes: z.string().nullable(),
  formData: z.string().nullable(),
});

export type CreateAppointment = z.infer<typeof AppointmentSchema>;
