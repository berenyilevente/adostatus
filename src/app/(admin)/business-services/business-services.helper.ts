import { Service as ServiceTable } from '@/generated/prisma';
import { z } from 'zod';

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

// TODO: create a supported currencies list
export const currencies = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
  { label: 'CAD', value: 'cad' },
  { label: 'AUD', value: 'aud' },
];
