"use client";

import { ReactElement } from "react";
import { flexRender, Table } from "@tanstack/react-table";

import { Icon } from "@/components";

export const TableHead = <T,>({ table }: { table: Table<T> }): ReactElement => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr className="" key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none flex items-center gap-0.5"
                        : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <div></div>
                    {{
                      asc: <Icon icon="chevronUp" size="xs" />,
                      desc: <Icon icon="chevronDown" size="xs" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
