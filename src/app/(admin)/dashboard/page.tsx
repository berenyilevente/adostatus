import { Button } from "@/components";
import { ReactElement } from "react";

const DashboardPage = (): ReactElement => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button>logout</Button>
    </div>
  );
};

export default DashboardPage;
