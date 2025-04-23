"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const { control, handleSubmit, setError } = form;

  const setErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const onSubmit = handleSubmit(async ({ email }: LoginSchemaType) => {
    setIsLoading(true);
    const callbackUrl = routes.dashboard.index;

    try {
      await signIn("email", { email, callbackUrl });
    } catch (e: any) {
      setErrors({ email: e.message });
    } finally {
      router.push(callbackUrl);
      setIsLoading(false);
    }
  });

  return {
    isLoading,
    form,
    onSubmit,
  };
};
