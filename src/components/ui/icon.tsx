'use client';

import { Icon as ReactIcon, IconProps as ReactIconProps } from '@iconify/react';
import { cn } from '@/utils';

import mail from '@iconify/icons-lucide/mail';
import close from '@iconify/icons-lucide/x';
import home from '@iconify/icons-lucide/home';
import user from '@iconify/icons-lucide/user';
import settings from '@iconify/icons-lucide/settings';
import logout from '@iconify/icons-lucide/log-out';
import login from '@iconify/icons-lucide/log-in';
import menu from '@iconify/icons-lucide/menu';
import dashboard from '@iconify/icons-lucide/layout-dashboard';
import database from '@iconify/icons-lucide/database';
import info from '@iconify/icons-lucide/info';
import success from '@iconify/icons-lucide/check-circle';
import warning from '@iconify/icons-lucide/alert-triangle';
import error from '@iconify/icons-lucide/alert-circle';
import moveRight from '@iconify/icons-lucide/move-right';
import moveLeft from '@iconify/icons-lucide/move-left';
import moveUp from '@iconify/icons-lucide/move-up';
import moveDown from '@iconify/icons-lucide/move-down';
import check from '@iconify/icons-lucide/check';
import dollarSign from '@iconify/icons-lucide/dollar-sign';
import xCircle from '@iconify/icons-lucide/x-circle';
import messagesSquare from '@iconify/icons-lucide/messages-square';
import caseSensitive from '@iconify/icons-lucide/case-sensitive';
import codeSquare from '@iconify/icons-lucide/code';
import combine from '@iconify/icons-lucide/combine';
import hexagon from '@iconify/icons-lucide/hexagon';
import monitorSmartphone from '@iconify/icons-lucide/monitor-smartphone';
import pencilLine from '@iconify/icons-lucide/pencil-line';
import pencilRuler from '@iconify/icons-lucide/pencil-ruler';
import sunMoon from '@iconify/icons-lucide/sun-moon';
import wand2 from '@iconify/icons-lucide/wand-2';
import chevronLeft from '@iconify/icons-lucide/chevron-left';
import chevronRight from '@iconify/icons-lucide/chevron-right';
import shoppingCart from '@iconify/icons-lucide/shopping-cart';
import CloudArrowUp from '@iconify/icons-lucide/upload-cloud';
import LockClosed from '@iconify/icons-lucide/lock';
import Server from '@iconify/icons-lucide/server';
import bell from '@iconify/icons-lucide/bell';
import users from '@iconify/icons-lucide/users';
import calendar from '@iconify/icons-lucide/calendar';
import copy from '@iconify/icons-lucide/copy';
import trash from '@iconify/icons-lucide/trash';
import chevronUp from '@iconify/icons-lucide/chevron-up';
import chevronDown from '@iconify/icons-lucide/chevron-down';
import search from '@iconify/icons-lucide/search';
import pencil from '@iconify/icons-lucide/pencil';
import filter from '@iconify/icons-lucide/settings-2';
import eye from '@iconify/icons-lucide/eye';
import eyeOff from '@iconify/icons-lucide/eye-off';
import plus from '@iconify/icons-lucide/plus';
import form from '@iconify/icons-lucide/clipboard-list';
import business from '@iconify/icons-lucide/home';

export const iconMap = {
  mail,
  close,
  home,
  user,
  settings,
  logout,
  login,
  menu,
  dashboard,
  database,
  info,
  success,
  warning,
  error,
  moveRight,
  moveLeft,
  moveUp,
  moveDown,
  check,
  dollarSign,
  xCircle,
  messagesSquare,
  caseSensitive,
  codeSquare,
  combine,
  hexagon,
  monitorSmartphone,
  pencilLine,
  pencilRuler,
  sunMoon,
  wand2,
  chevronLeft,
  chevronRight,
  shoppingCart,
  uploadCloud: CloudArrowUp,
  lock: LockClosed,
  server: Server,
  bell,
  users,
  calendar,
  copy,
  trash,
  chevronUp,
  chevronDown,
  search,
  pencil,
  filter,
  eye,
  eyeOff,
  plus,
  form,
  business,
};

export type IconType = keyof typeof iconMap;

interface IconProps extends ReactIconProps {
  icon: IconType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Icon = ({ size = 'sm', className, icon, ...props }: IconProps) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  return (
    <ReactIcon
      {...props}
      icon={iconMap[icon]}
      className={cn(className, sizeMap[size])}
    />
  );
};

Icon.displayName = 'Icon';
