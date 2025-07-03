import { TeamMember } from "@/generated/prisma";
import prisma from '@/lib/prisma/client';
import { Response } from '@/types/action.types';
import { isAuthenticated } from '@/utils/isAuthenticated';

export async function getTeamMembers(): Promise<Response<TeamMember[]>> {
  await isAuthenticated();

  const teamMembers = await prisma.teamMember.findMany();

  if (!teamMembers) {
    return {
      status: 'error',
      data: undefined,
      code: 404,
      errors: 'TeamMembers not found',
    };
  }

  return {
    status: 'success',
    data: teamMembers,
    code: 200,
    errors: undefined,
  };
}

export async function getTeamMember(id: string): Promise<Response<TeamMember>> {
  await isAuthenticated();

  const teamMember = await prisma.teamMember.findUnique({
    where: {
      id,
    },
  });

  if (!teamMember) {
    return {
      status: 'error',
      data: undefined,
      code: 404,
      errors: 'TeamMember not found',
    };
  }

  return {
    status: 'success',
    data: teamMember,
    code: 200,
    errors: undefined,
  };
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