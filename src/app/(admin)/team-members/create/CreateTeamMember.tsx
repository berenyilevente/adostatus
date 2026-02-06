'use client';

import React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  FormWrapper,
  ButtonLink,
  FormSelect,
  FormSwitch,
  FormInput,
} from '@/components';

import { useCreateTeamMember } from './use-create-teamMember';
import { teamMemberRoles } from '../teamMember.helper';

const CreateTeamMember = () => {
  const { form, onSubmit, isLoading, handleCancel } = useCreateTeamMember();

  return (
    <div className="space-y-6">
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
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
              />
              <FormInput
                control={form.control}
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
              />
              <FormInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter email"
              />
              <FormInput
                control={form.control}
                label="Phone"
                name="phone"
                placeholder="Enter phone number"
              />
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormSelect
                control={form.control}
                label="Business"
                name="businessId"
                placeholder="Select business"
                options={teamMemberRoles}
              />
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
      </FormWrapper>
    </div>
  );
};

export { CreateTeamMember };
