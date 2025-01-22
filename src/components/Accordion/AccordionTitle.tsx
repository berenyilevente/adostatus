import { cn } from "@/utils/cn";
import { ReactElement, ReactNode } from "react";

export const AccordionTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement => {
  const classNames = cn("collapse-title", className);

  return <div className={classNames}>{children}</div>;
};
