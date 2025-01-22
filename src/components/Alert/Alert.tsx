import React, { ReactNode } from "react";

import { Icon, IconType } from "@/components";
import { cn } from "@/utils";
import { variantMap, AlertVariant } from "./alert.helper";

interface IAlertProps {
  children: ReactNode;
  icon?: IconType;
  variant?: AlertVariant;
  className?: string;
}

export const Alert: React.FC<IAlertProps> = ({
  children,
  icon = "info",
  variant = "info",
  className,
}) => {
  const classNames = cn("alert", variantMap[variant], className);

  return (
    <div role="alert" className={classNames}>
      {icon && <Icon icon={icon} />}
      <span>{children}</span>
    </div>
  );
};
