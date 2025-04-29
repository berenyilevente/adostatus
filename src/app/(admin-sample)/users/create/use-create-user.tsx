"use client";

import { FilePondFile } from "filepond";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAppContext } from "@/hooks/use-create-app-context";
import { setImage } from "@/utils/image";

import { UserSchemaType, userSchema } from "../users.helper";
import { createUser } from "../actions/user.actions";
import { User } from "@/generated/prisma";

const useHook = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      name: "",
      image: "",
    },
  });

  const { handleSubmit, setValue, setError, watch } = form;

  const setErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const handleChangeImage = async (fileItems: FilePondFile[]) => {
    setImage(fileItems, setValue);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setIsLoading(true);
    // const response = await createUser(data);
    router.push("/users");
    setIsLoading(false);
  });

  const handleCancel = () => {
    router.push("/users");
  };

  return { onSubmit, handleCancel, handleChangeImage, isLoading, form };
};

const [useCreateUser, CreateUserProvider] = createAppContext(useHook);
export { useCreateUser, CreateUserProvider };
