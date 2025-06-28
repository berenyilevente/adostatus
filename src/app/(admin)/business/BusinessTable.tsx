'use client';

import React from 'react';

import {
  Button,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableSearch,
  TableHeader,
} from '@/components';

import { useBusiness } from './use-business';
import { useRouter } from 'next/navigation';

export const UserTable = () => {
  const router = useRouter();
  const { table, filterForm } = useBusiness();

  return (
    <Card className="bg-white">
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <TableSearch filterForm={filterForm} />

          <div className="flex items-center gap-1 mx-4">
            {table.getSelectedRowModel().rows.length > 0 && (
              <Button
                endIcon="trash"
                size="sm"
                iconSize="xs"
                variant="ghost"
                color="secondary"
              />
            )}
            <Button
              startIcon="plus"
              size="sm"
              iconSize="xs"
              variant="default"
              color="primary"
              onClick={() => router.push('/business/create')}
            >
              Add Business
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader table={table} />
          <TableBody table={table} />
        </Table>
        <TablePagination table={table} />
      </CardContent>
    </Card>
  );
};
