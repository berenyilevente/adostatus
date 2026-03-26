import { z } from 'zod';

export const updateTaxItemSchema = z.object({
  taxItemId: z.string().min(1),
  amount: z.coerce.number().min(0, 'Az összeg nem lehet negatív'),
  dueDate: z.coerce.date(),
  notes: z.string().optional(),
});

export type UpdateTaxItemInput = z.infer<typeof updateTaxItemSchema>;

export const updateTaxItemStatusSchema = z.object({
  taxItemId: z.string().min(1),
  status: z.enum(['NOT_PAID', 'PENDING', 'PAID']),
  paidDate: z.coerce.date().optional().nullable(),
});

export type UpdateTaxItemStatusInput = z.infer<typeof updateTaxItemStatusSchema>;

export const createMonthlyRecordSchema = z.object({
  userId: z.string().min(1),
  year: z.coerce.number().min(2020).max(2100),
  month: z.coerce.number().min(1).max(12),
});

export type CreateMonthlyRecordInput = z.infer<typeof createMonthlyRecordSchema>;
