'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createAppContext } from '@/hooks/use-create-app-context';

import { TeamMemberSchemaType, TeamMemberSchema } from '../teamMember.helper';
import { toast } from 'sonner';
import { createTeamMember } from '../actions/teamMember.actions';

const useHook = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TeamMemberSchemaType>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: {
      businessId: '',
      role: '',
      isActive: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const toggleCreateFormSheet = () => {
    document.getElementById('create-team-member-trigger')?.click();
  };
  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const response = await createTeamMember(data);
    if (response.status === 'success') {
      toast.success('Team member created successfully');
      setIsLoading(false);
      toggleCreateFormSheet();
      return;
    }
    if (response.status === 'error') {
      toast.error('Failed to create team member');
      setIsLoading(false);
      return;
    }
  });

  return { onSubmit, isLoading, form };
};

const [useCreateTeamMember, CreateTeamMemberProvider] =
  createAppContext(useHook);
export { useCreateTeamMember, CreateTeamMemberProvider };
