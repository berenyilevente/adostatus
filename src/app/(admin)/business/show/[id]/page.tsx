import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import { routes } from '@/lib/routes';

import { BusinessShow } from './BusinessShow';
import { BusinessShowProvider } from './use-business-show';
import { BusinessResponse, getBusiness } from '../../actions/business.actions';
import { PageTitle } from '../../../components';
import { Service } from '@/generated/prisma';
import { BusinessServicesProvider } from '@/app/(admin)/business-services/use-business-services';
import { BusinessHoursProvider } from '@/app/(admin)/business-hours/use-business-hours';
import { getServices } from '@/app/(admin)/business-services/actions/business-services.actions';
import { getTeamMembers } from '@/app/(admin)/team-members/actions/teamMember.actions';
import { TeamMemberWithUser } from '@/app/(admin)/team-members/teamMember.helper';

export const metadata: Metadata = {
  title: 'Show Business',
};

const ShowBusinessPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  let business: BusinessResponse | null = null;
  let services: Service[] | null = null;
  let teamMembers: TeamMemberWithUser[] = [];

  const rBusiness = await getBusiness(params.id);
  const rServices = await getServices(params.id);
  const rTeamMembers = await getTeamMembers([params.id]);

  if (rBusiness.status === 'success' && rBusiness.data) {
    business = rBusiness.data;
  } else {
    notFound();
  }

  if (rServices.status === 'success' && rServices.data) {
    services = rServices.data;
  } else {
    notFound();
  }

  if (rTeamMembers.status === 'success' && rTeamMembers.data) {
    teamMembers = rTeamMembers.data;
  }

  return (
    <div>
      <PageTitle
        title={'Business details'}
        breadcrumbs={[
          { label: 'Business', path: routes.admin.business.index },
          { label: 'Details', active: true },
        ]}
      />
      <div className="mt-5">
        <BusinessShowProvider business={business}>
          <BusinessServicesProvider
            business={business}
            services={services}
            teamMembers={teamMembers}
          >
            <BusinessHoursProvider businesses={[business]}>
              <BusinessShow />
            </BusinessHoursProvider>
          </BusinessServicesProvider>
        </BusinessShowProvider>
      </div>
    </div>
  );
};

export default ShowBusinessPage;
