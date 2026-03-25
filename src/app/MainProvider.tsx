import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/next';
import NextTopLoader from 'nextjs-toploader';

// todo: this is the main provider for the app. Any global providers should be added here (toast, auth, etc).
const MainProvider = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextTopLoader color="#2158e8" />
      <NuqsAdapter>
        <Toaster className="toaster-container" richColors position="top-right" />
        {children}
      </NuqsAdapter>
    </>
  );
};

export default MainProvider;
