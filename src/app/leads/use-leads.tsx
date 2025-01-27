"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { config } from "@/config";
import { RenderToast } from "@/types/action.types";

import { saveLead } from "./actions/lead.actions";
import { leadsSchema, LeadsSchemaType } from "./schemas/lead.schemas";

const renderToast: RenderToast = {
  success: () =>
    toast.success(`Thanks for joining the ${config.app.name} waitlist!`),
  error: () => toast.error("Something went wrong"),
};

export const useLeads = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LeadsSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(leadsSchema),
  });

  const setFormErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const onSubmit = handleSubmit(async (data: any) => {
    const response = await saveLead(data.email);
    setFormErrors(errors);
    renderToast[response.status]();
  });

  return { control, onSubmit };
};
