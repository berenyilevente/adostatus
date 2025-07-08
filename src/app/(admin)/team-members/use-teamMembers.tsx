'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TeamMember, User } from '@/generated/prisma';

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

  return {
    teamMembers,
    search,
    filterForm,
  };
};

const [useTeamMembers, TeamMembersProvider] = createAppContext(useHook);

export { useTeamMembers, TeamMembersProvider };
