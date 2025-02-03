import { ReactElement } from "react";
import { flexRender, Table } from "@tanstack/react-table";

export const TableBody = <T,>({ table }: { table: Table<T> }): ReactElement => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id} className="hover">
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
