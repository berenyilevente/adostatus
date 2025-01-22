import { cn } from "@/utils/cn";
import { ReactElement, ReactNode } from "react";

export const AccordionContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement => {
  const classNames = cn("collapse-content", className);

  return <div className={classNames}>{children}</div>;
};
