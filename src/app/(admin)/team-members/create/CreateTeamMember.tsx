"use client";

import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  FormWrapper,
  ButtonLink,
} from "@/components";

import { useCreateTeamMember } from "./use-create-teamMember";

const CreateTeamMember = () => {
  const { form, onSubmit, isLoading } = useCreateTeamMember();

  return (
    <FormWrapper form={form}>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Title here</CardTitle>
          </CardHeader>
          <CardContent className="gap-0">
            <div>
              Content here
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Title here</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
             Content Here
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-6">
        <ButtonLink
          href="/teamMembers"
          variant="outline"
          size="sm"
          className="bg-base-content/10"
          startIcon="close"
        >
          Cancel
        </ButtonLink>
        <Button
          color="primary"
          size="sm"
          onClick={onSubmit}
          startIcon="check"
          isLoading={isLoading}
        >
          Save
        </Button>
      </div>
    </FormWrapper>
  );
};

export { CreateTeamMember }; 