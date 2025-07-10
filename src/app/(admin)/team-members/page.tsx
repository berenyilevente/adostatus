import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Business, TeamMember, User } from '@/generated/prisma';

import { TeamMemberList } from './TeamMemberList';
import { TeamMembersProvider } from './use-teamMembers';
import { getTeamMembers } from './actions/teamMember.actions';
import { PageTitle } from '../components';
import { getBusinesses } from '../business/actions';

export const metadata: Metadata = {
  title: 'TeamMembers',
};

const TeamMembers = async () => {
  let teamMembers: (TeamMember & { user: User })[] = [];
  let businesses: Business[] = [];

  const rbusinesses = await getBusinesses();

  if (rbusinesses.status === 'success' && rbusinesses.data) {
    businesses = rbusinesses.data;
  }

  const businessIds = businesses.map((business) => business.id);

  const rTeamMembers = await getTeamMembers(businessIds);

  if (rTeamMembers === null) {
    return notFound();
  }

  if (rTeamMembers.status === 'success' && rTeamMembers.data) {
    teamMembers = rTeamMembers.data;
  }

  return (
    <TeamMembersProvider teamMembers={teamMembers} businesses={businesses}>
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
