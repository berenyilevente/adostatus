import { z } from 'zod';

import {
  Business as BusinessTable,
  BusinessHours as BusinessHoursTable,
  BreakTime as BreakTimeTable,
  Service as ServiceTable,
  TimeOff as TimeOffTable,
} from '@/generated/prisma';

// Business
type Business = Omit<BusinessTable, 'id' | 'createdAt' | 'updatedAt'>;

export const BusinessSchema: z.ZodType<Business> = z.object({
  ownerId: z.string(),
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().nullable(),
  businessType: z.string().nullable(),
  logoUrl: z.string().nullable(),
  primaryColor: z.string().nullable(),
  isActive: z.boolean(),
});

export type BusinessForm = z.infer<typeof BusinessSchema>;

// Business Hours
type BusinessHours = Omit<BusinessHoursTable, 'id' | 'createdAt' | 'updatedAt'>;

export const BusinessHoursSchema: z.ZodType<BusinessHours> = z.object({
  businessId: z.string(),
  isClosed: z.boolean(),
  dayOfWeek: z.string(),
  openTime: z.date(),
  closeTime: z.date(),
});

export type BusinessHoursForm = z.infer<typeof BusinessHoursSchema>;

// Break Times
type BreakTimes = Omit<BreakTimeTable, 'id' | 'createdAt' | 'updatedAt'>;

export const BreakTimesSchema: z.ZodType<BreakTimes> = z.object({
  businessId: z.string(),
  dayOfWeek: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});

// TODO move this to team member
// type TimeOff = Omit<TimeOffTable, 'id' | 'createdAt' | 'updatedAt'>;

// export const TimeOffSchema: z.ZodType<TimeOff> = z.object({
//   businessId: z.string(),
//   description: z.string(),
//   teamMemberId: z.string(),
//   startTime: z.date(),
//   endTime: z.date(),
//   startDate: z.date(),
//   endDate: z.date(),
// });

// Services
type Services = Omit<ServiceTable, 'id' | 'createdAt' | 'updatedAt'>;

export const ServicesSchema: z.ZodType<Services> = z.object({
  businessId: z.string(),
  name: z.string().min(1, 'Service name is required'),
  price: z.string().min(1, 'Service price is required'),
  currency: z.string().min(1, 'Service currency is required').nullable(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  duration: z.string().nullable(),
  bufferTime: z.string().nullable(),
  color: z.string().nullable(),
  formId: z.string().nullable(),
});

export type ServicesForm = z.infer<typeof ServicesSchema>;

// Create Business
export const CreateBusinessSchema = z.object({
  business: BusinessSchema,
  businessHours: BusinessHoursSchema,
  breakTimes: BreakTimesSchema,
});

export type CreateBusinessForm = z.infer<typeof CreateBusinessSchema>;

export const daysOfWeek = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
];

// TODO: create a supported currencies list
export const currencies = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
  { label: 'CAD', value: 'cad' },
  { label: 'AUD', value: 'aud' },
];

export const businessTypes = [
  { value: 'salon', label: 'Salon & Beauty' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'fitness', label: 'Fitness & Training' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'education', label: 'Education & Tutoring' },
  { value: 'other', label: 'Other' },
];
