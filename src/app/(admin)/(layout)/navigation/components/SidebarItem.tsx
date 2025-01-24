"use client";

import Link from "next/link";

import { MenuItem, Icon } from "@/components";

import { IMenuItem } from "../../types/menu.types";

export const SidebarItem = ({ menuItem }: { menuItem: IMenuItem }) => {
  const { icon, isTitle, label, children, url } = menuItem;

  if (isTitle) {
    return <li className="menu-title font-semibold">{label}</li>;
  }

  if (!children) {
    return (
      <MenuItem className="mb-0.5">
        <Link href={url ?? ""}>
          <div className="flex items-center gap-2">
            {icon && <Icon icon={icon} fontSize={18} />}
            {label}
          </div>
        </Link>
      </MenuItem>
    );
  }

  return (
    <MenuItem className="mb-0.5">
      <details>
        <summary>
          <div className="flex items-center gap-2">
            {icon && <Icon icon={icon} fontSize={18} />}
            {label}
          </div>
        </summary>
        <ul>
          {children.map((item, index) => (
            <SidebarItem menuItem={item} key={index} />
          ))}
        </ul>
      </details>
    </MenuItem>
  );
};
