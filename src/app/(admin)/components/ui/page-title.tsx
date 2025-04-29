import { ReactElement, ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  IconType,
} from "@/components";

type TBreadcrumbItem = {
  label: string;
  path?: string;
  active?: boolean;
  icon?: IconType;
};

const Breadcrumbs = ({
  breadcrumbs,
}: {
  breadcrumbs: TBreadcrumbItem[];
}): ReactElement => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(({ label, path }, index) => (
          <span className="flex items-center gap-2" key={label}>
            <BreadcrumbItem>
              {path ? (
                <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
              ) : (
                <span>{label}</span>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface PageTitleProps {
  breadcrumbs?: TBreadcrumbItem[];
  title: string;
  otherItems?: ReactNode;
}

export const PageTitle = ({ title, breadcrumbs }: PageTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">{title}</h3>
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
    </div>
  );
};
