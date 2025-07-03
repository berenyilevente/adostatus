import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { routes } from "@/lib/routes";

import { EditTeamMember } from "./EditTeamMember";
import { EditTeamMemberProvider } from "./use-edit-teamMember";
import { getTeamMember } from "../actions/teamMember.actions";
import { PageTitle } from "../../components";

export const metadata: Metadata = {
  title: "Edit TeamMember",
};

const EditTeamMemberPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  let teamMember: any | null = null;
  const rTeamMember = await getTeamMember(params.id);

  if (rTeamMember.status === "success" && rTeamMember.data) {
    teamMember = rTeamMember.data;
  } else {
    notFound();
  }

  return (
    <div>
      <PageTitle
        title={"Edit TeamMember"}
        breadcrumbs={[
          { label: "TeamMembers", path: routes.admin.teamMembers.index },
          { label: "Edit", active: true },
        ]}
      />
      <div className="mt-5">
        <EditTeamMemberProvider teamMember={teamMember}>
          <EditTeamMember />
        </EditTeamMemberProvider>
      </div>
    </div>
  );
};

export default EditTeamMemberPage; 