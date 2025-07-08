'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TeamMember, User } from '@/generated/prisma';
import { useMemo } from 'react';

import { createAppContext } from '@/hooks/use-create-app-context';

type HookProp = {
  teamMembers: (TeamMember & { user: User })[];
};

const useHook = ({ teamMembers }: HookProp) => {
  const router = useRouter();

  const filterForm = useForm({
    defaultValues: {
      search: '',
    },
  });

  const search = filterForm.watch('search');

  // Filter team members based on search
  const filteredTeamMembers = useMemo(() => {
    if (!search) return teamMembers;

    const searchLower = search.toLowerCase();
    return teamMembers.filter((teamMember) => {
      const userName = teamMember.user.name?.toLowerCase() || '';
      const userEmail = teamMember.user.email?.toLowerCase() || '';
      const userPhone = teamMember.user.phone?.toLowerCase() || '';
      const role = teamMember.role.toLowerCase();

      return (
        userName.includes(searchLower) ||
        userEmail.includes(searchLower) ||
        userPhone.includes(searchLower) ||
        role.includes(searchLower)
      );
    });
  }, [teamMembers, search]);

  return {
    teamMembers: filteredTeamMembers,
    search,
    filterForm,
  };
};

const [useTeamMembers, TeamMembersProvider] = createAppContext(useHook);

export { useTeamMembers, TeamMembersProvider };
