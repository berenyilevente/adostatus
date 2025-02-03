import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { ReactElement } from "react";

export const TableFooter = ({
  footerGroups,
}: {
  footerGroups: HeaderGroup<never>[];
}): ReactElement => {
  return (
    <tfoot>
      {footerGroups.map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};
