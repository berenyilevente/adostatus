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
  teamMemberId: z.string().min(1, 'Team member is required'),
});

export type ServicesForm = z.infer<typeof ServicesSchema>;

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
