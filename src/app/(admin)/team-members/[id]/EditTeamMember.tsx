'use client';

import React from 'react';
import { ArrowLeft, User, Shield, ToggleLeft } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  FormWrapper,
  FormInput,
  FormSelect,
  FormSwitch,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '@/components';

import { useEditTeamMember } from './use-edit-teamMember';
import { teamMemberRoles } from '../teamMember.helper';

const EditTeamMember = () => {
  const {
    form,
    onSubmit,
    isLoading,
    handleCancel,
    teamMember,
    getInitials,
    getRoleColor,
    getRoleLabel,
  } = useEditTeamMember();

  if (!teamMember) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading team member...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="flex items-center space-x-2"
            startIcon="arrowLeft"
          >
            <span>Back to Team Members</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <FormWrapper form={form}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Member Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    control={form.control}
                    label="Business ID"
                    name="businessId"
                    placeholder="Enter business ID"
                    disabled
                  />
                  <FormInput
                    control={form.control}
                    label="User ID"
                    name="userId"
                    placeholder="Enter user ID"
                    disabled
                  />
                </div>

                <FormSelect
                  control={form.control}
                  label="Role"
                  name="role"
                  placeholder="Select role"
                  options={teamMemberRoles}
                />

                <FormSwitch
                  control={form.control}
                  label="Active Status"
                  name="isActive"
                  description="Enable or disable this team member's access"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Member Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={teamMember.user?.image || undefined} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {getInitials(teamMember.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {teamMember.user?.name || 'Unnamed User'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {teamMember.user?.email || 'No email'}
                    </p>
                    <div className="mt-2">
                      <Badge className={getRoleColor(teamMember.role)}>
                        {getRoleLabel(teamMember.role)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge
                      variant={teamMember.isActive ? 'default' : 'secondary'}
                    >
                      {teamMember.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Joined:</span>
                    <span className="text-gray-900">
                      {new Date(teamMember.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {teamMember.user?.phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="text-gray-900">
                        {teamMember.user.phone}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export { EditTeamMember };
