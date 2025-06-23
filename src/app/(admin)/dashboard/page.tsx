import { ReactElement } from 'react';

import { PageTitle } from '../components';
import { DashboardProvider } from './use-dashboard';
import { Dashboard } from './Dashboard';

const DashboardPage = (): ReactElement => {
  return (
    <div>
      <PageTitle
        title="Dashboard"
        breadcrumbs={[{ label: 'Dashboard', active: true }]}
      />
      <DashboardProvider data={[]}>
        <Dashboard />
      </DashboardProvider>
    </div>
  );
};

export default DashboardPage;
