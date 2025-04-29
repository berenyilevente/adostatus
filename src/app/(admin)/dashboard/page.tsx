import { ReactElement } from "react";

import { DashboardProvider } from "./use-dashboard";
import { Dashboard } from "./Dashboard";
import { PageTitle } from "../components";

const DashboardPage = (): ReactElement => {
  return (
    <div>
      <PageTitle
        title="Dashboard"
        breadcrumbs={[{ label: "Dashboard", active: true }]}
      />
      <DashboardProvider data={[]}>
        <Dashboard />
      </DashboardProvider>
    </div>
  );
};

export default DashboardPage;
