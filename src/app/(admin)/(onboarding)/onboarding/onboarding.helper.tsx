import { z } from 'zod';

import { Business as BusinessTable } from '@/generated/prisma';

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
