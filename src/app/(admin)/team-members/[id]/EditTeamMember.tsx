"use client";

import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  FormWrapper,
} from "@/components";

import { useEditTeamMember } from "./use-edit-teamMember";

const EditTeamMember = () => {
  const {
    form,
    onSubmit,
    isLoading,
    handleCancel,
  } = useEditTeamMember();

  return (
    <FormWrapper form={form}>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-base-100">
          <CardHeader>
            <CardTitle>Title here</CardTitle>
          </CardHeader>
          <CardContent className="gap-0">
            <div>
              Content here
            </div>
          </CardContent>
        </Card>
        <Card className="bg-base-100">
          <CardHeader>
            <CardTitle>Title here</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Content here</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end gap-6">
        <Button
          variant="outline"
          size="sm"
          className="bg-base-content/10"
          onClick={handleCancel}
          startIcon="close"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          size="sm"
          onClick={onSubmit}
          startIcon="plus"
          isLoading={isLoading}
        >
          Save
        </Button>
      </div>
    </FormWrapper>
  );
};

export { EditTeamMember }; 