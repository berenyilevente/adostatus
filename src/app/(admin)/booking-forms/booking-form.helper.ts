import { z } from 'zod';

import { Form as FormTable, FormField } from '@/generated/prisma';

export type CreateBookingForm = Omit<
  FormTable,
  'id' | 'createdAt' | 'updatedAt'
>;

export const FormSchema = z.object({
  id: z.string().optional(),
  businessId: z.string(),
  name: z.string().min(1, 'Form name is required'),
  description: z.string().optional(),
  isTemplate: z.boolean().default(false),
  templateType: z.string().optional(),
  confirmationMessage: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  allowCancellation: z.boolean().default(true),
  cancellationNoticeHours: z.number().int().default(24),
  isActive: z.boolean().default(true),
  content: z.string().default('[]'),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
