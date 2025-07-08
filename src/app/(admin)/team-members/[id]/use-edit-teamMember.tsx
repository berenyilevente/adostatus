'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';
import { updateTeamMember } from '../actions/teamMember.actions';

import { TeamMemberSchemaType, TeamMemberSchema } from '../teamMember.helper';

type HookProp = {
  teamMember: any;
};

const useHook = ({ teamMember }: HookProp) => {
  const router = useRouter();
  const { id: teamMemberId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TeamMemberSchemaType>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: {
      businessId: '',
      userId: '',
      role: '',
      isActive: true,
    },
  });

  const { control, handleSubmit, watch, setValue, setError, reset } = form;

  // Set form values when teamMember data is available
  useEffect(() => {
    if (teamMember) {
      reset({
        businessId: teamMember.businessId || '',
        userId: teamMember.userId || '',
        role: teamMember.role || '',
        isActive: teamMember.isActive ?? true,
      });
    }
  }, [teamMember, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (!teamMemberId) {
      return;
    }

    setIsLoading(true);
    try {
      await updateTeamMember(teamMemberId.toString(), data);
      router.push('/team-members');
    } catch (error) {
      console.error('Failed to update team member:', error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleCancel = () => {
    router.back();
  };

  return {
    form,
    onSubmit,
    handleCancel,
    isLoading,
    teamMember,
  };
};

const [useEditTeamMember, EditTeamMemberProvider] = createAppContext(useHook);
export { useEditTeamMember, EditTeamMemberProvider };
