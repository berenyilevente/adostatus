import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/next';

// todo: this is the main provider for the app. Any global providers should be added here (toast, auth, etc).
const MainProvider = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NuqsAdapter>
        <Toaster
          className="toaster-container"
          richColors
          position="top-right"
        />
        {children}
      </NuqsAdapter>
    </>
  );
};

export default MainProvider;
