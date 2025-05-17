import type { Metadata } from "next";

import { Card, CardContent, Logo } from "@/components";
import { config } from "@/config/main.config";

import { LoginAuth } from "./LoginAuth";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <Card className="mt-10 mx-auto lg:max-w-md py-10">
      <CardContent>
        <Logo size={64} text={config.app.name} textPosition="bottom" />
        <h3 className="text-center text-xl font-semibold mt-6">
          Welcome to TimeGrid
        </h3>
        <h3 className="text-center text-sm text-base-content/70">
          Log in to access your account or start your subscription.
        </h3>
        <div className="mt-6">
          <LoginAuth />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
