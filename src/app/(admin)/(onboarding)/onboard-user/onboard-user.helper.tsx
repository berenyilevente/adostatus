import { z } from 'zod';

import { Business } from '@/generated/prisma';

type CreateBusiness = Omit<Business, 'id' | 'createdAt' | 'updatedAt'>;

export const businessSchema: z.ZodType<CreateBusiness> = z.object({
  ownerId: z.string(),
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().nullable(),
  businessType: z.string().nullable(),
  logoUrl: z.string().nullable(),
  primaryColor: z.string().nullable(),
  isActive: z.boolean(),
});

export type BusinessFormData = z.infer<typeof businessSchema>;

export const businessTypes = [
  { value: 'salon', label: 'Salon & Beauty' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'fitness', label: 'Fitness & Training' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'education', label: 'Education & Tutoring' },
  { value: 'other', label: 'Other' },
];
