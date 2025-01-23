import { Button } from "@/components";
import { ReactElement } from "react";
import { DashboardProvider } from "./use-dashboard";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { Dashboard } from "./Dashboard";

const DashboardPage = (): ReactElement => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <DashboardProvider data={[]}>
        <Dashboard />
      </DashboardProvider>
    </div>
  );
};

export default DashboardPage;
