"use client";

import React from "react";

import {
  Button,
  Card,
  CardBody,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableSearch,
  Modal,
  ModalActions,
} from "@/components";

import { useUsers } from "./use-users";
import { useRouter } from "next/navigation";

export const UserTable = () => {
  const router = useRouter();
  const { table, filterControl, usersToBeDeleted, onDeleteUsers } = useUsers();

  return (
    <Card className="bg-base-100">
      <CardBody className="p-0">
        <div className="flex justify-between items-center">
          <TableSearch filterControl={filterControl} />

          <div className="flex items-center gap-1 mx-4">
            {table.getSelectedRowModel().rows.length > 0 && (
              <Button
                endIcon="trash"
                size="xs"
                iconSize="xs"
                variant="ghost"
                color="secondary"
              />
            )}
            <Button
              startIcon="plus"
              size="sm"
              iconSize="xs"
              variant="active"
              color="primary"
              onClick={() => router.push("/users/create")}
            >
              Create User
            </Button>
          </div>
        </div>

        <Table>
          <TableHead table={table} />
          <TableBody table={table} />
        </Table>
        <TablePagination table={table} />
      </CardBody>
      <Modal id="delete-user-modal" title="Delete User">
        <div>
          Are you sure you want to delete user {usersToBeDeleted[0]?.email}?
        </div>
        <ModalActions>
          <Button variant="ghost">Cancel</Button>
          <Button color="error" className="text-white" onClick={onDeleteUsers}>
            Yes, delete user
          </Button>
        </ModalActions>
      </Modal>
    </Card>
  );
};
