"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FilePondFile } from "filepond";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createAppContext } from "@/hooks/use-create-app-context";

import { EditUserSchemaType, editUserSchema } from "../users.helper";
import { setImage } from "@/utils/image";

type HookProp = {
  user: any;
};

const useHook = ({ user }: HookProp) => {
  const router = useRouter();
  const { id: userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditUserSchemaType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user.email ?? undefined,
      mobileNumber: user.mobileNumber ?? undefined,
      image: user.image ?? undefined,
    },
  });

  const { control, handleSubmit, watch, setValue, setError } = form;

  const setErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const handleChangeImage = (fileItems: FilePondFile[]) => {
    setImage(fileItems, setValue);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!userId) {
      return;
    }

    setIsLoading(true);

    setIsLoading(false);
  });

  const handleCancel = () => {
    router.back();
  };

  return {
    form,
    onSubmit,
    handleCancel,
    handleChangeImage,
    userImage: watch("image"),
    isLoading,
  };
};

const [useEditUser, EditUserProvider] = createAppContext(useHook);
export { useEditUser, EditUserProvider };
