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
  SortingState,
  useReactTable,
  Row,
} from '@tanstack/react-table';
import { TeamMember } from '@/generated/prisma';

import { Button, TableCheckbox } from '@/components';
import { createAppContext } from '@/hooks/use-create-app-context';

type HookProp = {
  teamMembersData: TeamMember[];
};

const useHook = ({ teamMembersData }: HookProp) => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamMembersData);
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
      header: 'Id',
      accessorKey: 'id',
    },
    // Add more columns here
  ];

  const TableActions = () => ({
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }: { row: Row<TeamMember> }) => (
      <div className="flex">
        <Button
          size="sm"
          iconSize="xs"
          variant="ghost"
          startIcon="pencil"
          onClick={() => router.push(`/team-members/${row.original.id}`)}
        />
      </div>
    ),
  });

  const columns: ColumnDef<TeamMember, any>[] = [
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
    data: teamMembers,
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

const [useTeamMembers, TeamMembersProvider] = createAppContext(useHook);

export { useTeamMembers, TeamMembersProvider };
