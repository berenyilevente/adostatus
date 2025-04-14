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
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Button,
  ModalToggle,
  Image,
  Checkbox,
  TableCheckbox,
} from "@/components";
import { createAppContext } from "@/hooks/use-create-app-context";

import { IUser } from "./models/user.model";

type HookProp = {
  users: IUser[];
};

const useHook = ({ users: usersData }: HookProp) => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>(usersData);
  const [usersToBeDeleted, setUsersToBeDeleted] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const {
    control: filterControl,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const search = watch("search");
  const tableState = {
    pagination,
    sorting,
    rowSelection,
    globalFilter: search,
  };

  const onDeleteUsers = () => {
    console.log(usersToBeDeleted);
  };

  const TableColumns = () => [
    {
      header: "User",
      accessorKey: "email",
      cell: ({ row }: { row: Row<IUser> }) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.original.image}
            width={32}
            height={32}
            alt={row.original.email}
            className="rounded-full"
          />
          <span>{row.original.email}</span>
        </div>
      ),
    },
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Mobile Number",
      accessorKey: "mobileNumber",
    },
  ];

  const TableActions = () => ({
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }: { row: Row<IUser> }) => (
      <div className="flex">
        <Button
          size="xs"
          iconSize="xs"
          variant="ghost"
          startIcon="pencil"
          onClick={() => router.push(`/users/${row.original.id}`)}
        />
        <ModalToggle modalId="delete-user-modal">
          <Button
            size="xs"
            iconSize="xs"
            variant="ghost"
            startIcon="trash"
            onClick={() => setUsersToBeDeleted([row.original])}
          />
        </ModalToggle>
      </div>
    ),
  });

  const columns: ColumnDef<IUser, any>[] = [
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
    usersToBeDeleted,
    onDeleteUsers,
  };
};

const [useUsers, UsersProvider] = createAppContext(useHook);

export { useUsers, UsersProvider };
