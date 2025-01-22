import { ReactElement } from "react";

import { Card, Logo } from "@/components";
import { config } from "@/config/main.config";
import { CardBody } from "@/components/Card/CardBody";

const VerifyRequestPage = (): ReactElement => {
  return (
    <Card className="mt-10 mx-auto w-max py-10">
      <CardBody>
        <Logo size={64} text={config.app.name} textPosition="bottom" />
        <h3 className="text-center text-xl font-semibold mt-6">Email sent</h3>
        <h3 className="text-center text-sm text-base-content/70 mt-3 w-3/4 mx-auto">
          An email has been sent to you. Please check your email and click the
          magic link to login to your account.
        </h3>
      </CardBody>
    </Card>
  );
};

export default VerifyRequestPage;
