"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createAppContext } from "@/hooks/use-create-app-context";

import { TeamMemberSchemaType, TeamMemberSchema } from "../teamMember.helper";

type HookProp = {
  teamMember: any;
};

const useHook = ({ teamMember }: HookProp) => {
  const router = useRouter();
  const { id: teamMemberId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TeamMemberSchemaType>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: {
      // Add default values here
    },
  });

  const { control, handleSubmit, watch, setValue, setError } = form;

  const onSubmit = handleSubmit(async (data) => {
    if (!teamMemberId) {
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
    isLoading,
  };
};

const [useEditTeamMember, EditTeamMemberProvider] = createAppContext(useHook);
export { useEditTeamMember, EditTeamMemberProvider }; 