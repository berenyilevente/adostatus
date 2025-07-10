'use server';

import { TeamMember, User } from '@/generated/prisma';
import prisma from '@/lib/prisma/client';
import { Response } from '@/types/action.types';
import { handleResponse } from '@/utils/handleResponse';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { revalidatePath } from 'next/cache';

// TODO Explore an option to turn actions into a single class or function
export async function getTeamMembers(
  busnessIds: string[]
): Promise<Response<(TeamMember & { user: User })[]>> {
  await isAuthenticated();

  const teamMembers = await prisma.teamMember.findMany({
    where: {
      businessId: {
        in: busnessIds,
      },
    },
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

export async function getTeamMember(
  id: string
): Promise<Response<TeamMember & { user: User }>> {
  await isAuthenticated();

  const teamMember = await prisma.teamMember.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
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
): Promise<Response<TeamMember>> {
  await isAuthenticated();

  const teamMember = await prisma.teamMember.create({
    data: data as any,
  });

  revalidatePath('/team-members');

  return handleResponse({
    data: teamMember,
    error: 'Failed to create team member',
    code: 400,
  });
}

export async function updateTeamMember(
  id: string,
  data: Partial<TeamMember>
): Promise<Response<TeamMember>> {
  await isAuthenticated();

  const teamMember = await prisma.teamMember.update({
    where: { id },
    data: data as any,
  });

  revalidatePath('/team-members');

  return handleResponse({
    data: teamMember,
    error: 'Failed to update team member',
    code: 400,
  });
}

export async function deleteTeamMember(id: string): Promise<Response<void>> {
  await isAuthenticated();

  await prisma.teamMember.delete({
    where: { id },
  });

  revalidatePath('/team-members');

  return handleResponse({
    data: undefined,
    error: 'Failed to delete team member',
    code: 400,
  });
}
