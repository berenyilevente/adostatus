import * as React from 'react';
import { Control, UseFormReturn } from 'react-hook-form';
import { flexRender, Row, Table as TTable } from '@tanstack/react-table';

import {
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormInput,
  Form,
  FormWrapper,
} from '@/components';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from './pagination';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { table: TTable<any> }
>(({ className, table, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props}>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          );
        })}
      </TableRow>
    ))}
  </thead>
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { table: TTable<any> }
>(({ className, table, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}>
    {table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    )}
  </tbody>
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

const TableCheckbox = <T,>() => ({
  id: 'select',
  header: ({ table }: { table: TTable<T> }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="ml-4"
    />
  ),
  cell: ({ row }: { row: Row<T> }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      disabled={!row.getCanSelect()}
      className="ml-4"
    />
  ),
});
TableCheckbox.displayName = 'TableCheckbox';

const TablePagination = <T,>({ table }: { table: TTable<T> }): React.ReactElement => {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              className={cn(
                'cursor-pointer select-none',
                !table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : ''
              )}
            />
          </PaginationItem>

          {table.getCanPreviousPage() && (
            <PaginationItem>
              <PaginationLink onClick={() => table.previousPage()} className="cursor-pointer">
                {table.getState().pagination.pageIndex}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive className="cursor-pointer">
              {table.getState().pagination.pageIndex + 1}
            </PaginationLink>
          </PaginationItem>
          {table.getCanNextPage() && (
            <PaginationItem>
              <PaginationLink onClick={() => table.nextPage()} className="cursor-pointer">
                {table.getState().pagination.pageIndex + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              className={cn(
                'cursor-pointer select-none',
                !table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div>
        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Show ${table.getState().pagination.pageSize}`} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
TablePagination.displayName = 'TablePagination';

const TableSearch = ({
  filterForm,
}: {
  filterForm: UseFormReturn<any>;
}): React.ReactElement<any> => {
  return (
    <FormWrapper form={filterForm}>
      <div className="flex m-4">
        <FormInput
          startIcon="search"
          control={filterForm.control}
          id="search"
          name="search"
          placeholder="Search all columns..."
        />
      </div>
    </FormWrapper>
  );
};
TableSearch.displayName = 'TableSearch';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableCheckbox,
  TablePagination,
  TableSearch,
};
