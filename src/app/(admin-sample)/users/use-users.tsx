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
  Image,
  TableCheckbox,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components";
import { createAppContext } from "@/hooks/use-create-app-context";

type HookProp = {
  users: any[];
};

const useHook = ({ users: usersData }: HookProp) => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>(usersData);
  const [usersToBeDeleted, setUsersToBeDeleted] = useState<any[]>([]);
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
      cell: ({ row }: { row: Row<any> }) => (
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

  const DeleteUserDialog = ({ row }: { row: Row<any> }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          iconSize="xs"
          variant="ghost"
          startIcon="trash"
          onClick={() => setUsersToBeDeleted([row.original])}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete user
            {usersToBeDeleted[0]?.email}?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button color="error" className="text-white" onClick={onDeleteUsers}>
            Yes, delete user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const TableActions = () => ({
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }: { row: Row<any> }) => (
      <div className="flex">
        <Button
          size="sm"
          iconSize="xs"
          variant="ghost"
          startIcon="pencil"
          onClick={() => router.push(`/users/${row.original.id}`)}
        />
        <DeleteUserDialog row={row} />
      </div>
    ),
  });

  const columns: ColumnDef<any, any>[] = [
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
