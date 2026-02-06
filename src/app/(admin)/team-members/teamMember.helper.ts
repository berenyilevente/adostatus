import { TeamMember, User } from '@/generated/prisma';
import { z } from 'zod';

export type TeamMemberWithUser = TeamMember & { user: User };

export const TeamMemberSchema = z.object({
  businessId: z.string().min(1, 'Business ID is required'),
  role: z.string().min(1, 'Role is required'),
  isActive: z.boolean().default(false),
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export type TeamMemberSchemaType = z.infer<typeof TeamMemberSchema>;

export const teamMemberRoles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Staff', value: 'staff' },
];
