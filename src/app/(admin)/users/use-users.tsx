"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button, checkbox } from "@/components";
import { createAppContext } from "@/hooks/use-create-app-context";

import { IUser } from "./models/user.model";

type HookProp = {
  users: IUser[];
};

const useHook = ({ users: usersData }: HookProp) => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>(usersData);

  const {
    control: filterControl,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const columns: ColumnDef<IUser, any>[] = [
    checkbox("select"),
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="flex">
          <Button
            size="xs"
            iconSize="xs"
            variant="ghost"
            startIcon="pencil"
            onClick={() => router.push(`/users/${row.original.id}`)}
          />
          <Button size="xs" iconSize="xs" variant="ghost" startIcon="trash" />
        </div>
      ),
    },
  ];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const search = watch("search");

  const tableState = {
    pagination,
    sorting,
    rowSelection,
    globalFilter: search,
  };

  const tableOptions = {
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: (value: string) => setValue("search", value),
  };

  const table = useReactTable({
    data: users,
    columns,
    state: tableState,
    ...tableOptions,
  });

  return {
    table,
    search,
    filterControl,
  };
};

const [useUsers, UsersProvider] = createAppContext(useHook);

export { useUsers, UsersProvider };
