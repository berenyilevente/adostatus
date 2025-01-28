"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { saveLead } from "./actions/lead.actions";
import { leadsSchema, LeadsSchemaType } from "./schemas/lead.schemas";

export const useLeads = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitSuccessful, errors },
  } = useForm<LeadsSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(leadsSchema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    await saveLead(data.email);
  });

  return { control, onSubmit, isValid, isSubmitSuccessful };
};
