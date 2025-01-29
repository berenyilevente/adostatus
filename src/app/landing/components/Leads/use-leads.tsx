"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { saveLead } from "./actions/lead.actions";
import { leadsSchema, LeadsSchemaType } from "./schemas/lead.schemas";
import { useState } from "react";

export const useLeads = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitSuccessful, errors },
  } = useForm<LeadsSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(leadsSchema),
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data: any) => {
    await saveLead(data.email);
    setSubmitted(true);
  });

  return { control, onSubmit, isValid, submitted };
};
