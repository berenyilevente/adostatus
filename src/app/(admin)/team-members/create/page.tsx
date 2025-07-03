import { Metadata } from "next";
import React from "react";

import { routes } from "@/lib/routes";

import { CreateTeamMember } from "./CreateTeamMember";
import { CreateTeamMemberProvider } from "./use-create-teamMember";
import { PageTitle } from "../../components";

export const metadata: Metadata = {
  title: "Create TeamMember",
};

const CreateTeamMemberPage = () => {
  return (
    <div>
      <PageTitle
        title={"Create TeamMember"}
        breadcrumbs={[
          { label: "TeamMembers", path: routes.admin.teamMembers.index },
          { label: "Create", active: true },
        ]}
      />
      <div className="mt-5">
        <CreateTeamMemberProvider>
          <CreateTeamMember />
        </CreateTeamMemberProvider>
      </div>
    </div>
  );
};

export default CreateTeamMemberPage; 