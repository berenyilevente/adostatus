import {
  BusinessHours as BusinessHoursTable,
  BreakTime as BreakTimeTable,
} from '@/generated/prisma';
import { z } from 'zod';

export const AppointmentFormSchema = z.object({
  businessId: z.string(),
  serviceId: z.string().min(1, 'Service is required'),
  teamMemberId: z.string().min(1, 'Team member is required'),
  title: z.string().min(2, 'Appointment title must be at least 2 characters'),
  description: z.string().nullable(),
  start: z.date(),
  end: z.date(),
  status: z
    .enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'])
    .default('PENDING'),
  backgroundColor: z.string().nullable(),
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(1, 'Customer phone is required'),
});

export type CreateAppointmentForm = z.infer<typeof AppointmentFormSchema>;

// TODO Replace this with the Appointment type
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
  description: string;
}

// Business Hours
type BusinessHours = Omit<BusinessHoursTable, 'id' | 'createdAt' | 'updatedAt'>;

export const BusinessHoursSchema: z.ZodType<BusinessHours> = z.object({
  businessId: z.string(),
  dayOfWeek: z.array(z.string()),
  openTime: z.string(),
  closeTime: z.string(),
});

export type BusinessHoursForm = z.infer<typeof BusinessHoursSchema>;

// Break Times
type BreakTimes = Omit<BreakTimeTable, 'id' | 'createdAt' | 'updatedAt'>;

export const BreakTimesSchema: z.ZodType<BreakTimes> = z.object({
  businessId: z.string(),
  dayOfWeek: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string(),
});

export const CreateBusinessHoursSchema = z.object({
  businessHours: BusinessHoursSchema,
  breakTimes: BreakTimesSchema,
});

export type CreateBusinessHoursForm = z.infer<typeof CreateBusinessHoursSchema>;

export const daysOfWeek = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];
