import { routes } from "@/lib/routes";
import { IMenuItem } from "../types/menu.types";

export const adminMenuItems: IMenuItem[] = [
  {
    key: "dashboard",
    icon: "dashboard",
    label: "Dashboard",
    url: routes.admin.dashboard,
  },
  {
    key: "users",
    icon: "users",
    label: "Users",
    url: routes.admin.users,
  },
];
