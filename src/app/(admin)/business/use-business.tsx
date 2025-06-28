'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Business } from '@/generated/prisma';

import { Button, Image, TableCheckbox } from '@/components';
import { createAppContext } from '@/hooks/use-create-app-context';

type HookProp = {
  businessData: Business[];
};

const useHook = ({ businessData }: HookProp) => {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const filterForm = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { watch, setValue } = filterForm;

  const search = watch('search');
  const tableState = {
    pagination,
    sorting,
    rowSelection,
    globalFilter: search,
  };

  const TableColumns = () => [
    {
      header: 'Business',
      accessorKey: 'name',
      cell: ({ row }: { row: Row<Business> }) => (
        <div className="flex items-center gap-2">
          {row.original.logoUrl && (
            <Image
              src={row.original.logoUrl}
              width={32}
              height={32}
              alt={row.original.name}
              className="rounded-full"
            />
          )}
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      header: 'Id',
      accessorKey: 'id',
    },
    {
      header: 'Mobile Number',
      accessorKey: 'mobileNumber',
    },
  ];

  const TableActions = () => ({
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }: { row: Row<Business> }) => (
      <div className="flex">
        <Button
          size="sm"
          iconSize="xs"
          variant="ghost"
          startIcon="pencil"
          onClick={() => router.push(`/business/${row.original.id}`)}
        />
      </div>
    ),
  });

  const columns: ColumnDef<Business, any>[] = [
    TableCheckbox(),
    ...TableColumns(),
    TableActions(),
  ];

  const tableOptions = {
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: (value: string) => setValue('search', value),
  };

  const table = useReactTable({
    data: businessData,
    columns,
    state: tableState,
    ...tableOptions,
  });

  return {
    table,
    search,
    filterForm,
  };
};

const [useBusiness, BusinessProvider] = createAppContext(useHook);

export { useBusiness, BusinessProvider };
