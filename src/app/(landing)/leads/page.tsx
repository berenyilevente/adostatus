import { ReactElement } from "react";

import { Card, CardBody, Logo } from "@/components";
import { config } from "@/config";

import { Leads } from "./Leads";

const LeadsPage = (): ReactElement => {
  return (
    <Card className="mt-10 mx-auto lg:w-1/3  py-10">
      <CardBody>
        <Logo size={64} text={config.app.name} textPosition="bottom" />
        <h3 className="text-center text-xl font-semibold mt-6">
          Join waitlist
        </h3>
        <h3 className="text-center text-sm text-base-content/70">
          Sign up to get early access to {config.app.name} with a 40% discount
          at launch.
        </h3>
        <div className="mt-1">
          <Leads />
        </div>
      </CardBody>
    </Card>
  );
};

export default LeadsPage;
