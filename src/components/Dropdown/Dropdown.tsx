"use client";

import { ReactElement, ReactNode } from "react";

export const Dropdown = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return <details className="dropdown">{children}</details>;
};
