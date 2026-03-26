'use client';

import { ReactElement } from 'react';
import { useSession } from 'next-auth/react';

import {
  Logo,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  Icon,
  SidebarMenuSub,
  SidebarMenuSubItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components';
import { config } from '@/config';

import { clientMenuItems, accountantMenuItems } from './menu-items';
import { IMenuItem } from '../types/menu.types';
import { ChevronDownIcon } from 'lucide-react';

const SidebarItem = ({ item }: { item: IMenuItem }) => {
  if (item.collapsible && item.children) {
    return (
      <Collapsible defaultOpen className="group/collapsible" key={item.key}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {item.icon && <Icon icon={item.icon} />}
            <span>{item.label}</span>
            <ChevronDownIcon className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((child) => (
              <SidebarMenuSubItem key={child.key}>
                <SidebarMenuButton asChild>
                  <a href={child.url || '#'}>
                    <span>{child.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem key={item.key}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          {item.icon && <Icon icon={item.icon} />}
          <span>{item.label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const AppSidebar = (): ReactElement => {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const menuItems = role === 'ACCOUNTANT' ? accountantMenuItems : clientMenuItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-2 mb-6">
            <Logo text={config.app.name} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarItem key={item.key} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
