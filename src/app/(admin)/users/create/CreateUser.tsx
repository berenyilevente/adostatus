"use client";

import React from "react";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FileInput,
  TextInput,
  PasswordInput,
  Label,
} from "@/components";

import { useCreateUser } from "./use-create-user";

const CreateUser = () => {
  const { control, handleChangeImage, handleCancel, onSubmit, isLoading } =
    useCreateUser();

  return (
    <form>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="bg-base-100">
          <CardBody className="gap-0">
            <CardTitle>Basic Information</CardTitle>
            <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
              <div className="form-control w-3/4">
                <Label title="Email" htmlFor="email" />
                <TextInput
                  control={control}
                  size="sm"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-control w-3/4">
                <Label title="Mobile" htmlFor="mobile" />
                <TextInput
                  control={control}
                  size="sm"
                  id="mobile"
                  name={"mobileNumber"}
                  placeholder="Mobile"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-base-100">
          <CardBody>
            <CardTitle>Upload Profile Image</CardTitle>
            <div className="mt-1">
              <div className="filepond-file-upload">
                <FileInput
                  onupdatefiles={handleChangeImage}
                  labelIdle={`<div>Drag and Drop your files or <span style="text-decoration: underline">Browse</span></div>`}
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-base-100">
          <CardBody className="gap-0">
            <CardTitle>Create Password</CardTitle>
            <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
              <div className="form-control w-3/4">
                <Label title="Password" htmlFor="password" />
                <PasswordInput
                  control={control}
                  size="sm"
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="on"
                />
              </div>
              <div className="form-control w-3/4">
                <Label title="Confirm Password" htmlFor="confirm_password" />
                <PasswordInput
                  control={control}
                  size="sm"
                  id="confirm_password"
                  name={"confirmPassword"}
                  placeholder="Confirm Password"
                  autoComplete="on"
                />
              </div>
            </div>
          </CardBody>
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
          startIcon="check"
          isLoading={isLoading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export { CreateUser };
