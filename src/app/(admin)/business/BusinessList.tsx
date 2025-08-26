'use client';

import React from 'react';

import {
  Button,
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
import { EmptyList } from '../components/ui/empty-list';
import { BusinessCard } from './components/BusinessCard';

export const BusinessList = () => {
  const router = useRouter();
  const {
    businesses,
    filterForm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    cancelDelete,
    confirmDelete,
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
      {businesses.length === 0 ? (
        <EmptyList>
          <EmptyList.Icon icon="business" />
          <EmptyList.Title title="No businesses" />
          <EmptyList.Description description="Get started by adding your first business." />
          <EmptyList.Action
            label="Add Business"
            onClick={() => router.push('/business/create')}
          />
        </EmptyList>
      ) : (
        businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))
      )}

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
