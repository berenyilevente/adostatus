"use client";

import React, { HTMLProps, useRef } from "react";
import { Row, Table } from "@tanstack/react-table";

import { cn } from "@/utils/combineClassNames";

interface TableCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
  className?: string;
}

const TableCheckboxElement = ({
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

export const TableCheckbox = <T,>(id?: string) => ({
  id: "select",
  header: ({ table }: { table: Table<T> }) => (
    <TableCheckboxElement
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }: { row: Row<T> }) => (
    <TableCheckboxElement
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      indeterminate={row.getIsSomeSelected()}
      onChange={row.getToggleSelectedHandler()}
    />
  ),
});
