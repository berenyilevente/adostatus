"use client";

import { ReactElement } from "react";
import { Table } from "@tanstack/react-table";

export const TablePagination = <T,>({
  table,
}: {
  table: Table<T>;
}): ReactElement => {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <div className="join border">
        <button
          className={`join-item outline-none btn btn-ghost btn-sm ${
            !table.getCanPreviousPage() ? "pointer-events-none" : ""
          }`}
          onClick={() => table.previousPage()}
        >
          {"<"}
        </button>
        <button className="join-item outline-none btn btn-ghost font-normal btn-sm pointer-events-none text-xs">
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </button>
        <button
          className={`join-item outline-none btn btn-ghost btn-sm ${
            !table.getCanNextPage() ? "pointer-events-none" : ""
          }`}
          onClick={() => table.nextPage()}
        >
          {">"}
        </button>
      </div>
      <select
        className="select select-bordered select-sm"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50, 100].map((pageSize) => (
          <option className="btn m-1" key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
