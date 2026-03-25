import { z } from 'zod';

export const leadsSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});
export type LeadsSchemaType = z.infer<typeof leadsSchema>;
