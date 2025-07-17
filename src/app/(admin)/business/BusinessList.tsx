'use client';

import React from 'react';

import {
  Badge,
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
import {
  Calendar,
  Edit,
  Mail,
  Phone,
  Trash2,
  User,
  UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from 'date-fns';

export const BusinessList = () => {
  const router = useRouter();
  const {
    businesses,
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
      {businesses.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No businesses
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first business.
          </p>
          <Button
            onClick={() => router.push('/business/create')}
            variant="outline"
          >
            Add Business
          </Button>
        </div>
      ) : (
        businesses.map((business) => (
          <Card className="bg-white" key={business.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={business.logoUrl || undefined} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {business.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {business.name || 'Unnamed Business'}
                      </h3>
                      <Badge
                        variant="outline"
                        className={cn(business.primaryColor)}
                      >
                        {business.businessType}
                      </Badge>
                      {!business.isActive && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-600"
                        >
                          Inactive
                        </Badge>
                      )}
                    </div>

                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      {business.description && (
                        <div className="flex items-center space-x-1">
                          <span>{business.description}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/business/edit/${business.id}`)}
                    className="flex items-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog(business.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

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
