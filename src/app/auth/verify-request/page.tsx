import { ReactElement } from "react";

import { Card, CardContent, Logo } from "@/components";
import { config } from "@/config/main.config";

const VerifyRequestPage = (): ReactElement => {
  return (
    <Card className="mt-10 mx-auto w-max py-10">
      <CardContent>
        <Logo size={64} text={config.app.name} textPosition="bottom" />
        <h3 className="text-center text-xl font-semibold mt-6">Email sent</h3>
        <h3 className="text-center text-sm text-base-content/70 mt-3 w-3/4 mx-auto">
          An email has been sent to you. Please check your inbox and click the
          link to get started.
        </h3>
        <h3 className="text-center text-xs text-base-content/10 mt-3 w-3/4 mx-auto">
          *If you don't see the email, please check your spam folder.
        </h3>
      </CardContent>
    </Card>
  );
};

export default VerifyRequestPage;
