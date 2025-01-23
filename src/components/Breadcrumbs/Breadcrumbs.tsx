"use client";

import Link from "next/link";
import { ReactElement } from "react";

import { cn } from "@/utils";
import { Icon, IconType } from "../Icon/Icon";

export type BreadcrumbItem = {
  label: string;
  path?: string;
  active?: boolean;
  icon?: IconType;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({
  items,
  className,
}: BreadcrumbsProps): ReactElement => {
  return (
    <div className={cn("breadcrumbs text-sm", className)}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.icon && <Icon icon={item.icon} size="xs" />}
            {item.path ? (
              <Link href={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
