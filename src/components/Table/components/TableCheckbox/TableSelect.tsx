"use client";

import React, { HTMLProps, useRef } from "react";
import { Row, Table } from "@tanstack/react-table";

import { cn } from "@/utils/combineClassNames";

export const checkbox = <T,>(id: string) => ({
  id,
  header: ({ table }: { table: Table<T> }) => (
    <TableCheckbox
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }: { row: Row<T> }) => (
    <TableCheckbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onChange={row.getToggleSelectedHandler()}
    />
  ),
});

interface TableCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
  className?: string;
}

export const TableCheckbox = ({
  indeterminate,
  className,
  ...props
}: TableCheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null!);

  return (
    <input
      {...props}
      type="checkbox"
      ref={ref}
      className={cn(className, "cursor-pointer, checkbox checkbox-sm")}
    />
  );
};
