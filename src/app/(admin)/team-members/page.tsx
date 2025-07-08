import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { TeamMember, User } from '@/generated/prisma';

import { TeamMemberList } from './TeamMemberList';
import { TeamMembersProvider } from './use-teamMembers';
import { getTeamMembers } from './actions/teamMember.actions';
import { PageTitle } from '../components';

export const metadata: Metadata = {
  title: 'TeamMembers',
};

const TeamMembers = async () => {
  let teamMembers: (TeamMember & { user: User })[] = [];

  const rTeamMembers = await getTeamMembers();

  if (rTeamMembers === null) {
    return notFound();
  }

  if (rTeamMembers.status === 'success' && rTeamMembers.data) {
    teamMembers = rTeamMembers.data;
  }

  return (
    <TeamMembersProvider teamMembers={teamMembers}>
      <PageTitle
        title={'TeamMembers'}
        breadcrumbs={[{ label: 'TeamMembers', active: true }]}
      />
      <div className="mt-5">
        <TeamMemberList />
      </div>
    </TeamMembersProvider>
  );
};

export default TeamMembers;
