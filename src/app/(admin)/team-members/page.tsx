import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TeamMember } from "@/generated/prisma";

import { TeamMemberTable } from "./TeamMemberTable";
import { TeamMembersProvider } from "./use-teamMembers";
import { getTeamMembers } from "./actions/teamMember.actions";
import { PageTitle } from "../components";

export const metadata: Metadata = {
  title: "TeamMembers",
};

const TeamMembers = async () => {
  let teamMembers: TeamMember[] = [];
  const rTeamMembers = await getTeamMembers();

  if (rTeamMembers === null) {
    return notFound();
  }

  if (rTeamMembers.status === "success" && rTeamMembers.data) {
    teamMembers = rTeamMembers.data;
  }

  return (
    <TeamMembersProvider teamMembersData={teamMembers}>
      <PageTitle
        title={"TeamMembers"}
        breadcrumbs={[{ label: "TeamMembers", active: true }]}
      />
      <div className="mt-5">
        <TeamMemberTable />
      </div>
    </TeamMembersProvider>
  );
};

export default TeamMembers; 