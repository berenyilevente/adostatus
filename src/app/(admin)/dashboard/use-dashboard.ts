"use client";

import { createAppContext } from "@/hooks/use-create-app-context";
import { DashboardData } from "./types/dashboard.types";

const useHook = ({ data }: { data: DashboardData }) => {
  return {};
};

const [useDashboard, DashboardProvider] = createAppContext(useHook);
export { useDashboard, DashboardProvider };
