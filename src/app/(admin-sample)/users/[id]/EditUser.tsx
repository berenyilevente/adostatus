"use client";

import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  FileInput,
  FormInput,
  CardHeader,
  Form,
  FormWrapper,
} from "@/components";

import { useEditUser } from "./use-edit-user";

const EditUser = () => {
  const {
    form,
    userImage,
    onSubmit,
    isLoading,
    handleChangeImage,
    handleCancel,
  } = useEditUser();

  return (
    <FormWrapper form={form}>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-base-100">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="gap-0">
            <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
              <FormInput
                control={form.control}
                id="email"
                name="email"
                placeholder="Email"
                label="Email"
              />
              <FormInput
                control={form.control}
                id="name"
                name="name"
                placeholder="Name"
                label="Name"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-base-100">
          <CardHeader>
            <CardTitle>Upload Profile Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-1">
              <div className="filepond-file-upload">
                <FileInput
                  files={[...(userImage ? [userImage] : [])]}
                  onupdatefiles={handleChangeImage}
                  labelIdle={`<div>Drag and Drop your files or <span style="text-decoration: underline">Browse</span></div>`}
                />
              </div>
            </div>
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

export { EditUser };
