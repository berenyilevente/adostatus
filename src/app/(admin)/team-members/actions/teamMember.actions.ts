'use server';

import { TeamMember, User } from '@/generated/prisma';
import prisma from '@/lib/prisma/client';
import { Response } from '@/types/action.types';
import { handleResponse } from '@/utils/handleResponse';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { revalidatePath } from 'next/cache';
import { TeamMemberSchemaType, TeamMemberWithUser } from '../teamMember.helper';

// TODO Explore an option to turn actions into a single class or function
export async function getTeamMembers(
  busnessIds: string[]
): Promise<Response<TeamMemberWithUser[]>> {
  await isAuthenticated();

  const teamMembers = await prisma.teamMember.findMany({
    where: {
      businessId: {
        in: busnessIds,
      },
    },
    include: {
      user: true,
      business: true,
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
    where: { id },
    include: { user: true, business: true },
  });

  return handleResponse({
    data: teamMember,
    error: 'TeamMember not found',
    code: 404,
  });
}

export async function createTeamMember(
  data: TeamMemberSchemaType
): Promise<Response<{ teamMember: TeamMember; user: User }>> {
  await isAuthenticated();

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    },
  });

  const teamMember = await prisma.teamMember.create({
    data: {
      role: data.role,
      isActive: data.isActive,
      user: { connect: { id: newUser.id } },
      business: { connect: { id: data.businessId } },
    },
  });

  revalidatePath('/team-members');

  return handleResponse({
    data: { teamMember, user: newUser },
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
