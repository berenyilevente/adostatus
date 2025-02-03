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
} from "@/components";

import { useUsers } from "./use-users";

export const UserTable = () => {
  const { table, filterControl } = useUsers();

  return (
    <Card className="bg-base-100">
      <CardBody className="p-0">
        <div className="flex justify-between items-center">
          <TableSearch filterControl={filterControl} />
          <div className="flex items-center">
            {table.getSelectedRowModel().rows.length > 0 && (
              <Button
                endIcon="trash"
                size="xs"
                variant="ghost"
                color="secondary"
              />
            )}
            <Button
              endIcon="filter"
              size="xs"
              variant="ghost"
              color="secondary"
              className="mr-4"
            />
          </div>
        </div>

        <Table>
          <>
            <TableHead table={table} />
            <TableBody table={table} />
          </>
        </Table>
        <TablePagination table={table} />
      </CardBody>
    </Card>
  );
};
