"use client";

import { createAppContext } from "@/hooks/use-create-app-context";
import { useState } from "react";

const useHook = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(true);

  return { isNavbarOpen, setIsNavbarOpen };
};

const [useNavigation, NavigationProvider] = createAppContext(useHook);

export { useNavigation, NavigationProvider };
