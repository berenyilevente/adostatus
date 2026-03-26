import { ReactElement } from 'react';
import { redirect } from 'next/navigation';

import { PageTitle } from '../components';
import { DashboardProvider } from './use-dashboard';
import { Dashboard } from './Dashboard';
import { getDashboardData } from './actions/dashboard.actions';

const DashboardPage = async (): Promise<ReactElement> => {
  const response = await getDashboardData();

  if (response.status === 'error' || !response.data) {
    redirect('/auth/login');
  }

  return (
    <div>
      <PageTitle title="Dashboard" breadcrumbs={[{ label: 'Dashboard', active: true }]} />
      <div className="mt-6">
        <DashboardProvider data={response.data}>
          <Dashboard />
        </DashboardProvider>
      </div>
    </div>
  );
};

export default DashboardPage;
