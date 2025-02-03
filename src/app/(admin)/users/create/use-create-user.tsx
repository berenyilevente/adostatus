"use client";

import { FilePondFile } from "filepond";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAppContext } from "@/hooks/use-create-app-context";
import { convertImage } from "@/utils/image";

import { CreateUserSchemaType, createUserSchema } from "../users.helper";

const useHook = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setValue, setError, formState } =
    useForm<CreateUserSchemaType>({
      resolver: zodResolver(createUserSchema),
      defaultValues: {
        password: "",
        confirmPassword: "",
        email: "",
        mobileNumber: "",
        status: "verified",
      },
    });

  const setErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const handleChangeImage = (fileItems: FilePondFile[]) => {
    const image = convertImage(fileItems);
    if (image) {
      setValue("image", image);
    } else {
      setValue("image", undefined);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    setIsLoading(false);
  });

  const handleCancel = () => {
    router.back();
  };

  return {
    control,
    onSubmit,
    handleCancel,
    handleChangeImage,
    isLoading,
  };
};

const [useCreateUser, CreateUserProvider] = createAppContext(useHook);
export { useCreateUser, CreateUserProvider };
