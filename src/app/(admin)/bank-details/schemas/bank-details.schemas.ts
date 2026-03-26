import { z } from 'zod';

export const updateBankDetailsSchema = z.object({
  taxTypeId: z.string().min(1),
  accountNumber: z.string().min(1, 'A számlaszám megadása kötelező'),
  accountName: z.string().min(1, 'A számlanév megadása kötelező'),
  bankName: z.string().optional(),
});

export type UpdateBankDetailsInput = z.infer<typeof updateBankDetailsSchema>;

export const updateUserPaymentDetailSchema = z.object({
  userId: z.string().min(1),
  taxTypeId: z.string().min(1),
  paymentReference: z.string().min(1, 'A közlemény megadása kötelező'),
});

export type UpdateUserPaymentDetailInput = z.infer<typeof updateUserPaymentDetailSchema>;
