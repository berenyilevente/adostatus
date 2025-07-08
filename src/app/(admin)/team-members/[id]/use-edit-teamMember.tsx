'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { createAppContext } from '@/hooks/use-create-app-context';
import { updateTeamMember } from '../actions/teamMember.actions';

import {
  TeamMemberSchemaType,
  TeamMemberSchema,
  teamMemberRoles,
} from '../teamMember.helper';
import { toast } from 'sonner';

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
      businessId: teamMember.businessId || '',
      userId: teamMember.userId || '',
      role: teamMember.role || '',
      isActive: teamMember.isActive ?? true,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (!teamMemberId) {
      return;
    }

    setIsLoading(true);

    const response = await updateTeamMember(teamMemberId.toString(), data);

    if (response.status === 'success') {
      toast.success('Team member updated successfully');
      setIsLoading(false);
      return;
    }

    if (response.status === 'error') {
      toast.error('Failed to update team member');
      setIsLoading(false);
      return;
    }
  });

  const handleCancel = () => {
    router.back();
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role: string) => {
    const roleOption = teamMemberRoles.find((r) => r.value === role);
    return roleOption ? roleOption.label : role;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'staff':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return {
    form,
    onSubmit,
    handleCancel,
    isLoading,
    teamMember,
    getInitials,
    getRoleLabel,
    getRoleColor,
  };
};

const [useEditTeamMember, EditTeamMemberProvider] = createAppContext(useHook);
export { useEditTeamMember, EditTeamMemberProvider };
