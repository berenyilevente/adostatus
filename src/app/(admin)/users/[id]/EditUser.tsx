"use client";

import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Label,
  FileInput,
  TextInput,
} from "@/components";

import { useEditUser } from "./use-edit-user";

const EditUser = () => {
  const {
    control,
    userImage,
    onSubmit,
    isLoading,
    handleChangeImage,
    handleCancel,
  } = useEditUser();

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-base-100">
          <CardContent className="gap-0">
            <CardTitle>Basic Information</CardTitle>
            <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
              <div>
                <Label title={"Email"} htmlFor="email" />
                <TextInput
                  control={control}
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div>
                <Label title={"Mobile"} htmlFor="mobile" />
                <TextInput
                  control={control}
                  id="mobile"
                  name="mobileNumber"
                  placeholder="Mobile"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-base-100">
          <CardContent>
            <CardTitle>Upload Profile Image</CardTitle>
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
          variant="ghost"
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
    </div>
  );
};

export { EditUser };
