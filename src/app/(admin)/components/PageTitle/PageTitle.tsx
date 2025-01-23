import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@/components/Breadcrumbs/Breadcrumbs";
import { ReactNode } from "react";

interface PageTitleProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  otherItems?: ReactNode;
}

export const PageTitle = ({ title, breadcrumbs }: PageTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">{title}</h3>
      {breadcrumbs && (
        <Breadcrumbs className="hidden p-0 sm:inline" items={breadcrumbs} />
      )}
    </div>
  );
};
