import { TeamMember, User } from '@/generated/prisma';
import prisma from '@/lib/prisma/client';
import { Response } from '@/types/action.types';
import { handleResponse } from '@/utils/handleResponse';
import { isAuthenticated } from '@/utils/isAuthenticated';

export async function getTeamMembers(): Promise<
  Response<(TeamMember & { user: User })[]>
> {
  await isAuthenticated();

  const teamMembers = await prisma.teamMember.findMany({
    include: {
      user: true,
    },
  });

  return handleResponse({
    data: teamMembers,
    error: 'TeamMembers not found',
    code: 404,
  });
}

export async function getTeamMember(id: string): Promise<Response<TeamMember>> {
  await isAuthenticated();

  const teamMember = await prisma.teamMember.findUnique({
    where: {
      id,
    },
  });

  return handleResponse({
    data: teamMember,
    error: 'TeamMember not found',
    code: 404,
  });
}

export async function createTeamMember(
  data: Partial<TeamMember>
): Promise<TeamMember> {
  await isAuthenticated();

  // Implementation here
  return {} as TeamMember;
}

export async function updateTeamMember(
  id: string,
  data: Partial<TeamMember>
): Promise<TeamMember> {
  await isAuthenticated();

  // Implementation here
  return {} as TeamMember;
}

export async function deleteTeamMember(id: string): Promise<void> {
  await isAuthenticated();

  // Implementation here
}
