'use server';

import { Role, User } from '@/generated/prisma';
import { isAuthenticated } from './isAuthenticated';

type RoleGuardResult = {
  session: Awaited<ReturnType<typeof isAuthenticated>>['session'];
  user: User;
};

export const requireRole = async (
  allowedRoles: Role[],
): Promise<RoleGuardResult> => {
  const { session, user } = await isAuthenticated();

  if (!allowedRoles.includes(user.role)) {
    throw new Error('Unauthorized: insufficient role');
  }

  return { session, user };
};

export const requireAccountant = async () => requireRole([Role.ACCOUNTANT]);

export const requireClient = async () => requireRole([Role.CLIENT]);
