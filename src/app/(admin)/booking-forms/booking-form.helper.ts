import { z } from 'zod';

import { Form as FormTable } from '@/generated/prisma';

export type CreateBookingForm = Omit<
  FormTable,
  'id' | 'createdAt' | 'updatedAt'
>;

export const FormSchema = z.object({
  id: z.string().optional(),
  businessId: z.string(),
  serviceId: z.string(),
  name: z.string().min(1, 'Form name is required'),
  description: z.string().nullable(),
  isTemplate: z.boolean().default(false),
  templateType: z.string().nullable(),
  confirmationMessage: z.string().nullable(),
  url: z.string().url().nullable().or(z.literal('')),
  allowCancellation: z.boolean().default(true),
  cancellationNoticeHours: z.number().int().default(24),
  status: z.enum(['DRAFT', 'LIVE', 'ARCHIVED']).default('DRAFT'),
  content: z.string().default('[]'),
  userId: z.string().default(''),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
