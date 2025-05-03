"use client";

import { Icon as ReactIcon, IconProps as ReactIconProps } from "@iconify/react";
import { cn } from "@/utils";

import mailIcon from "@iconify/icons-lucide/mail";
import closeIcon from "@iconify/icons-lucide/x";
import homeIcon from "@iconify/icons-lucide/home";
import userIcon from "@iconify/icons-lucide/user";
import settingsIcon from "@iconify/icons-lucide/settings";
import logoutIcon from "@iconify/icons-lucide/log-out";
import loginIcon from "@iconify/icons-lucide/log-in";
import menuIcon from "@iconify/icons-lucide/menu";
import dashboardIcon from "@iconify/icons-lucide/layout-dashboard";
import databaseIcon from "@iconify/icons-lucide/database";
import infoIcon from "@iconify/icons-lucide/info";
import successIcon from "@iconify/icons-lucide/check-circle";
import warningIcon from "@iconify/icons-lucide/alert-triangle";
import errorIcon from "@iconify/icons-lucide/alert-circle";
import moveRight from "@iconify/icons-lucide/move-right";
import moveLeft from "@iconify/icons-lucide/move-left";
import moveUp from "@iconify/icons-lucide/move-up";
import moveDown from "@iconify/icons-lucide/move-down";
import checkIcon from "@iconify/icons-lucide/check";
import dollarSignIcon from "@iconify/icons-lucide/dollar-sign";
import xCircleIcon from "@iconify/icons-lucide/x-circle";
import messagesSquareIcon from "@iconify/icons-lucide/messages-square";
import caseSensitiveIcon from "@iconify/icons-lucide/case-sensitive";
import codeSquareIcon from "@iconify/icons-lucide/code";
import combineIcon from "@iconify/icons-lucide/combine";
import hexagonIcon from "@iconify/icons-lucide/hexagon";
import monitorSmartphoneIcon from "@iconify/icons-lucide/monitor-smartphone";
import pencilLineIcon from "@iconify/icons-lucide/pencil-line";
import pencilRulerIcon from "@iconify/icons-lucide/pencil-ruler";
import sunMoonIcon from "@iconify/icons-lucide/sun-moon";
import wand2Icon from "@iconify/icons-lucide/wand-2";
import chevronLeftIcon from "@iconify/icons-lucide/chevron-left";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import shoppingCartIcon from "@iconify/icons-lucide/shopping-cart";
import CloudArrowUpIcon from "@iconify/icons-lucide/upload-cloud";
import LockClosedIcon from "@iconify/icons-lucide/lock";
import ServerIcon from "@iconify/icons-lucide/server";
import bellIcon from "@iconify/icons-lucide/bell";
import usersIcon from "@iconify/icons-lucide/users";
import calendarIcon from "@iconify/icons-lucide/calendar";
import copyIcon from "@iconify/icons-lucide/copy";
import trashIcon from "@iconify/icons-lucide/trash";
import ChevronUpIcon from "@iconify/icons-lucide/chevron-up";
import ChevronDownIcon from "@iconify/icons-lucide/chevron-down";
import SearchIcon from "@iconify/icons-lucide/search";
import PencilIcon from "@iconify/icons-lucide/pencil";
import FilterIcon from "@iconify/icons-lucide/settings-2";
import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";
import plusIcon from "@iconify/icons-lucide/plus";
import formIcon from "@iconify/icons-lucide/clipboard-list";

export const iconMap = {
  mail: mailIcon,
  close: closeIcon,
  home: homeIcon,
  user: userIcon,
  settings: settingsIcon,
  logout: logoutIcon,
  login: loginIcon,
  menu: menuIcon,
  dashboard: dashboardIcon,
  database: databaseIcon,
  info: infoIcon,
  success: successIcon,
  warning: warningIcon,
  error: errorIcon,
  moveRight: moveRight,
  moveLeft: moveLeft,
  moveUp: moveUp,
  moveDown: moveDown,
  check: checkIcon,
  dollarSign: dollarSignIcon,
  xCircle: xCircleIcon,
  messagesSquare: messagesSquareIcon,
  caseSensitive: caseSensitiveIcon,
  codeSquare: codeSquareIcon,
  combine: combineIcon,
  hexagon: hexagonIcon,
  monitorSmartphone: monitorSmartphoneIcon,
  pencilLine: pencilLineIcon,
  pencilRuler: pencilRulerIcon,
  sunMoon: sunMoonIcon,
  wand2: wand2Icon,
  chevronLeft: chevronLeftIcon,
  chevronRight: chevronRightIcon,
  shoppingCart: shoppingCartIcon,
  uploadCloud: CloudArrowUpIcon,
  lock: LockClosedIcon,
  server: ServerIcon,
  bell: bellIcon,
  users: usersIcon,
  calendar: calendarIcon,
  copy: copyIcon,
  trash: trashIcon,
  chevronUp: ChevronUpIcon,
  chevronDown: ChevronDownIcon,
  search: SearchIcon,
  pencil: PencilIcon,
  filter: FilterIcon,
  eye: eyeIcon,
  eyeOff: eyeOffIcon,
  plus: plusIcon,
  form: formIcon,
};

export type IconType = keyof typeof iconMap;

interface IconProps extends ReactIconProps {
  icon: IconType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Icon = ({ size = "sm", className, icon, ...props }: IconProps) => {
  const sizeMap = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  return (
    <ReactIcon
      {...props}
      icon={iconMap[icon]}
      className={cn(className, sizeMap[size])}
    />
  );
};

Icon.displayName = "Icon";
