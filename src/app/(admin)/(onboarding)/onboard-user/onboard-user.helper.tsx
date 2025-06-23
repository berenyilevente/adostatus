import { z } from 'zod';

import { Business } from '@/generated/prisma';

type CreateBusinessType = Omit<
  Business,
  'id' | 'createdAt' | 'updatedAt' | 'emailVerified'
>;

export const businessSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().optional(),
  businessType: z.string().min(1, 'Please select a business type'),
  logoUrl: z.string().optional(),
  primaryColor: z.string().optional(),
  businessHours: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  customBusinessType: z.string().optional(),
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
