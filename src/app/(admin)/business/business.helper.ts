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
  timezone: z.string().default('UTC'),
  logoUrl: z.string().optional(),
  primaryColor: z.string().optional(),
  businessHours: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
});

export type BusinessFormData = z.infer<typeof businessSchema>;
