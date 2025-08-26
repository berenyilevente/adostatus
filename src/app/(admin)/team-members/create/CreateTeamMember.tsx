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
} from '@/components';

import { useCreateTeamMember } from './use-create-teamMember';

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
              <CardTitle>Title here</CardTitle>
            </CardHeader>
            <CardContent className="gap-0">
              <div>Content here</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Title here</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Content Here</div>
            </CardContent>
          </Card>
        </div>
      </FormWrapper>
    </div>
  );
};

export { CreateTeamMember };
