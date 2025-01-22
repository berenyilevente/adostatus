"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";

export const useLogin = () => {
  const router = useRouter();
  const toaster = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const { control, handleSubmit, setError } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const setErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const onSubmit = handleSubmit(async (data: LoginSchemaType) => {
    setIsLoading(true);
    try {
      signIn("email", {
        email: data.email,
        callbackUrl: routes.landing,
      });

      toaster.success("Logged in successfully");
      // router.push(routes.dashboard.index);
    } catch (e: any) {
    } finally {
      setIsLoading(false);
    }
  });

  return {
    isLoading,
    control,
    onSubmit,
  };
};
