import { z } from 'zod';

export const TeamMemberSchema = z.object({
  businessId: z.string().min(1, 'Business ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  role: z.string().min(1, 'Role is required'),
  isActive: z.boolean().default(true),
});

export type TeamMemberSchemaType = z.infer<typeof TeamMemberSchema>;

export const teamMemberRoles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Staff', value: 'staff' },
];
