'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, User, Mail, Phone, Calendar } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
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
  FormWrapper,
  FormInput,
} from '@/components';

import { useTeamMembers } from './use-teamMembers';
import { formatDate } from 'date-fns';
import { cn } from '@/lib/utils';
import { EmptyList } from '../components/ui/empty-list';

export const TeamMemberList = () => {
  const router = useRouter();
  const {
    teamMembers,
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
  } = useTeamMembers();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full items-center gap-1 ">
        <FormWrapper form={filterForm} className="flex gap-4">
          <FormInput
            startIcon="search"
            control={filterForm.control}
            id="search"
            name="search"
            placeholder="Search team members..."
          />
        </FormWrapper>
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
      {teamMembers.length === 0 ? (
        <EmptyList>
          <EmptyList.Icon icon="user" />
          <EmptyList.Title title="No team members" />
          <EmptyList.Description description="Get started by adding your first team member." />
          <EmptyList.Action
            label="Add Team Member"
            onClick={() => router.push('/team-members/create')}
          />
        </EmptyList>
      ) : (
        teamMembers.map((teamMember) => (
          <Card className="bg-white" key={teamMember.id}>
            <CardContent className="p-4">
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
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {teamMember.user.name || 'Unnamed User'}
                      </h3>
                      <Badge
                        variant="outline"
                        className={cn(getRoleColor(teamMember.role))}
                      >
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
                          Joined{' '}
                          {formatDate(teamMember.createdAt, 'MMM d, yyyy')}
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
            </CardContent>
          </Card>
        ))
      )}

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
    </div>
  );
};
