'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, User, Mail, Phone, Calendar } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TablePagination,
  TableSearch,
  TableHeader,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components';

import { useTeamMembers } from './use-teamMembers';
import { deleteTeamMember } from './actions/teamMember.actions';
import { teamMemberRoles } from './teamMember.helper';

export const TeamMemberTable = () => {
  const router = useRouter();
  const { teamMembers, filterForm } = useTeamMembers();
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

  return (
    <>
      <Card className="bg-white">
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-6 border-b">
            <TableSearch filterForm={filterForm} />

            <div className="flex items-center gap-1">
              <Button
                startIcon="plus"
                size="sm"
                iconSize="xs"
                variant="default"
                color="primary"
                onClick={() => router.push('/team-members/create')}
              >
                Add Team Member
              </Button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No team members
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by adding your first team member.
                </p>
                <Button
                  onClick={() => router.push('/team-members/create')}
                  variant="outline"
                >
                  Add Team Member
                </Button>
              </div>
            ) : (
              teamMembers.map((teamMember) => (
                <div
                  key={teamMember.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={teamMember.user.image || undefined} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getInitials(teamMember.user.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {teamMember.user.name || 'Unnamed User'}
                          </h3>
                          <Badge className={getRoleColor(teamMember.role)}>
                            {getRoleLabel(teamMember.role)}
                          </Badge>
                          {!teamMember.isActive && (
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 text-gray-600"
                            >
                              Inactive
                            </Badge>
                          )}
                        </div>

                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          {teamMember.user.email && (
                            <div className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{teamMember.user.email}</span>
                            </div>
                          )}
                          {teamMember.user.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{teamMember.user.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Joined {formatDate(teamMember.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/team-members/${teamMember.id}`)
                        }
                        className="flex items-center space-x-1"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(teamMember)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              {teamMemberToDelete?.user?.name || 'this team member'}? This
              action cannot be undone and will remove them from all associated
              appointments and schedules.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Team Member'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
