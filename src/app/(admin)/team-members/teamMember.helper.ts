import { z } from 'zod';

import { TeamMember as TeamMemberTable } from '@/generated/prisma';

type CreateTeamMemberType = Omit<
  TeamMemberTable,
  'id' | 'createdAt' | 'updatedAt'
>;

export const TeamMemberSchema: z.ZodType<CreateTeamMemberType> = z.object({
  // Add fields here based on the TeamMemberTable type definition
});

export type TeamMemberSchemaType = z.infer<typeof TeamMemberSchema>;
