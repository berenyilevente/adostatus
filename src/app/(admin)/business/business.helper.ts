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

export const businessTypes = [
  { value: 'salon', label: 'Salon & Beauty' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'fitness', label: 'Fitness & Training' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'education', label: 'Education & Tutoring' },
  { value: 'other', label: 'Other' },
];

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
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  duration: z.number(),
  bufferTime: z.number(),
  price: z.number(),
  isPublic: z.boolean(),
  isFeatured: z.boolean(),
  color: z.string(),
  formId: z.string(),
});

// Create Business
export const CreateBusinessSchema = z.object({
  business: BusinessSchema,
  businessHours: BusinessHoursSchema,
  breakTimes: BreakTimesSchema,
  services: ServicesSchema,
});

export type CreateBusinessForm = z.infer<typeof CreateBusinessSchema>;
