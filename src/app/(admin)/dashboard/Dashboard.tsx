import { ReactElement } from "react";

import { Button } from "@/components";

export const Dashboard = (): ReactElement => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button>logout</Button>
    </div>
  );
};
