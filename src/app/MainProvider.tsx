import { ReactNode } from "react";
import { Toaster } from "sonner";

// todo: this is the main provider for the app. Any global providers should be added here (toast, auth, etc).
const MainProvider = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster className="toaster-container" richColors position="top-right" />
      {children}
    </>
  );
};

export default MainProvider;
