"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAppContext } from "@/hooks/use-create-app-context";

import { TeamMemberSchemaType, TeamMemberSchema } from "../teamMember.helper";

const useHook = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TeamMemberSchemaType>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: {
      // Add default values here
    },
  });

  const { handleSubmit, setValue } = form;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const handleCancel = () => {
    router.push("/teamMembers");
  };

  return { onSubmit, handleCancel, isLoading, form };
};

const [useCreateTeamMember, CreateTeamMemberProvider] = createAppContext(useHook);
export { useCreateTeamMember, CreateTeamMemberProvider }; 