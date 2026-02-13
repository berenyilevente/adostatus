import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Card, CardContent, Logo } from '@/components';
import { config } from '@/config/main.config';

import { Purchase } from './Purchase';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return (
    <Card className="mt-10 mx-auto lg:max-w-md py-10">
      <CardContent>
        <Logo size={64} text={config.app.name} textPosition="bottom" />
        <h3 className="text-center text-xl font-semibold mt-6">
          Welcome to {config.app.name}
        </h3>
        <h3 className="text-center text-sm text-base-content/70">
          Provide your email address to get started.
        </h3>
        <div className="mt-6">
          <Suspense fallback={null}>
            <Purchase />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
