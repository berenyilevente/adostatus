'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Business, TeamMember, User } from '@/generated/prisma';
import { useMemo, useState } from 'react';

import { createAppContext } from '@/hooks/use-create-app-context';
import { teamMemberRoles } from './teamMember.helper';
import { deleteTeamMember } from './actions/teamMember.actions';

type HookProp = {
  teamMembers: (TeamMember & { user: User })[];
  businesses: Business[];
};

const useHook = ({ teamMembers, businesses }: HookProp) => {
  const router = useRouter();

  const filterForm = useForm({
    defaultValues: {
      search: '',
      business: null,
    },
  });

  const search = filterForm.watch('search');

  // Filter team members based on search
  const filteredTeamMembers = useMemo(() => {
    if (!search) {
      return teamMembers;
    }

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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teamMemberToDelete, setTeamMemberToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (teamMember: any) => {
    setTeamMemberToDelete(teamMember);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!teamMemberToDelete) return;

    setIsDeleting(true);
    try {
      await deleteTeamMember(teamMemberToDelete.id);
      setDeleteDialogOpen(false);
      setTeamMemberToDelete(null);
      // Refresh the page to get updated data
      router.refresh();
    } catch (error) {
      console.error('Failed to delete team member:', error);
    } finally {
      setIsDeleting(false);
    }
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  const businessOptions = businesses.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  return {
    teamMembers: filteredTeamMembers,
    search,
    filterForm,
    handleDeleteClick,
    handleDeleteConfirm,
    deleteDialogOpen,
    teamMemberToDelete,
    isDeleting,
    getRoleLabel,
    getRoleColor,
    getInitials,
    setDeleteDialogOpen,
    businessOptions,
  };
};

const [useTeamMembers, TeamMembersProvider] = createAppContext(useHook);

export { useTeamMembers, TeamMembersProvider };
