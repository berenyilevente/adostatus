"use client";

import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  FileInput,
  TextInput,
  Label,
  CardHeader,
  SelectInput,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
} from "@/components";

import { useCreateUser } from "./use-create-user";

const CreateUser = () => {
  const {
    form,
    control,
    handleChangeImage,
    handleCancel,
    onSubmit,
    isLoading,
  } = useCreateUser();

  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <Card className="bg-base-100">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="gap-0">
              <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                <TextInput
                  control={form.control}
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                <TextInput
                  control={form.control}
                  id="mobile"
                  name={"mobileNumber"}
                  placeholder="Mobile"
                />
                <SelectInput
                  control={form.control}
                  name="role"
                  id="role"
                  options={["Admin", "User"]}
                  selectLabel="Select Role"
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
            startIcon="check"
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { CreateUser };
