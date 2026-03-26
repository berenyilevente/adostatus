import { z } from 'zod';

export const inviteClientSchema = z.object({
  email: z.string().email('Érvényes e-mail címet adjon meg'),
  firstName: z.string().min(1, 'A vezetéknév megadása kötelező'),
  lastName: z.string().min(1, 'A keresztnév megadása kötelező'),
});

export type InviteClientInput = z.infer<typeof inviteClientSchema>;
