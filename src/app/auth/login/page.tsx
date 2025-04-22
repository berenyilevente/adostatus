import type { Metadata } from "next";

import { Card, CardContent, Logo } from "@/components";

import { LoginAuth } from "./LoginAuth";
import { config } from "@/config/main.config";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <Card className="mt-10 mx-auto lg:w-1/3  py-10">
      <CardContent>
        <Logo size={64} text={config.app.name} textPosition="bottom" />
        <h3 className="text-center text-xl font-semibold mt-6">Login</h3>
        <h3 className="text-center text-sm text-base-content/70">
          Sign in to your account with a magic link
        </h3>
        <div className="mt-4">
          <LoginAuth />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
