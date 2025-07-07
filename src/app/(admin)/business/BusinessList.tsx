'use client';

import React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormInput,
  FormWrapper,
} from '@/components';

import { useBusiness } from './use-business';
import { useRouter } from 'next/navigation';
import { UserIcon } from 'lucide-react';

export const BusinessList = () => {
  const router = useRouter();
  const {
    businessData,
    filterForm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    cancelDelete,
    confirmDelete,
    openDeleteDialog,
  } = useBusiness();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full items-center gap-1 ">
        <FormWrapper form={filterForm} className="flex gap-4">
          <FormInput
            startIcon="search"
            control={filterForm.control}
            id="search"
            name="search"
            placeholder="Search businesses..."
          />
        </FormWrapper>
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
      {businessData.map((business) => (
        <Card className="bg-white" key={business.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={business.logoUrl || ''} />
                  <AvatarFallback>
                    <UserIcon className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{business.name}</p>
                  <p className="text-xs text-gray-500">
                    {business.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" endIcon="plus" variant="outline" fullWidth>
                  Add services
                </Button>
                <Button
                  size="icon"
                  endIcon="pencil"
                  variant="ghost"
                  onClick={() => router.push(`/business/${business.id}`)}
                />
                <Button
                  size="icon"
                  endIcon="trash"
                  variant="ghost"
                  onClick={() => openDeleteDialog(business.id)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}{' '}
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Business</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this business? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
