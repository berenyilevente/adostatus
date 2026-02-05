'use client';

import { Button } from '@/components/ui/button';
import { ReactElement } from 'react';

import {
  CardContent,
  Card,
  FormWrapper,
  FormInput,
  FormSelect,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetHeader,
  Badge,
  FormTextarea,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components';
import { useRouter } from 'next/navigation';
import { useBookingForms } from './use-booking-forms';
import { cn } from '@/utils/combineClassNames';
import { EmptyList } from '../components/ui/empty-list';
import { CreateBookingFormProvider } from './create/use-create-booking-form';
import { CreateBookingForm } from './create/CreateBookingForm';

export const BookingFormList = (): ReactElement => {
  const router = useRouter();
  const {
    bookingForms,
    filterForm,
    editForm,
    statusOptions,
    onSubmitEditForm,
    isEditSheetOpen,
    setIsEditSheetOpen,
    handleEditForm,
    handleDeleteForm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    confirmDelete,
    cancelDelete,
    toggleCreateFormSheet,
    businessOptions,
  } = useBookingForms();

  const statusColorMap = {
    DRAFT: 'bg-primary text-white hover:bg-primary',
    LIVE: 'bg-green-600 text-white hover:bg-green-600',
    ARCHIVED: 'bg-yellow-500 text-white hover:bg-yellow-500',
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full items-center gap-1 ">
        <FormWrapper form={filterForm} className="flex gap-4 items-center">
          <FormInput
            control={filterForm.control}
            id="search"
            name="search"
            placeholder="Search booking forms..."
          />
          <FormSelect
            control={filterForm.control}
            name="business"
            placeholder="Select business..."
            options={businessOptions}
          />
          <FormSelect
            control={filterForm.control}
            name="status"
            placeholder="Select status..."
            options={statusOptions}
          />
        </FormWrapper>
        <CreateBookingForm />
      </div>
      {bookingForms.length === 0 ? (
        <EmptyList>
          <EmptyList.Icon icon="form" />
          <EmptyList.Title title="No booking forms" />
          <EmptyList.Description description="Get started by creating your first booking form." />
          <EmptyList.Action
            label="Create a new booking form"
            onClick={toggleCreateFormSheet}
          />
        </EmptyList>
      ) : (
        bookingForms.map((bookingForm) => (
          <Card className="bg-white" key={bookingForm.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Badge
                    className={cn(
                      statusColorMap[
                        bookingForm.status as keyof typeof statusColorMap
                      ]
                    )}
                  >
                    {bookingForm.status}
                  </Badge>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{bookingForm.name}</p>
                    <p className="text-xs text-gray-500">
                      {bookingForm.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/booking-forms/${bookingForm.id}`)
                    }
                    endIcon="form"
                  >
                    Open form editor
                  </Button>
                  <Button
                    size="icon"
                    endIcon="pencil"
                    variant="ghost"
                    onClick={() => handleEditForm(bookingForm)}
                  />
                  <Button
                    size="icon"
                    endIcon="trash"
                    variant="ghost"
                    onClick={() => handleDeleteForm(bookingForm.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Edit Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="h-full w-[500px]">
          <SheetHeader>
            <SheetTitle>Form details</SheetTitle>
            <SheetDescription>Update the form details.</SheetDescription>
          </SheetHeader>
          <FormWrapper
            form={editForm}
            className="flex gap-4 flex-col w-full mt-6"
          >
            <FormSelect
              control={editForm.control}
              label="Business"
              name="businessId"
              placeholder="Select business..."
              options={businessOptions}
            />
            <FormInput
              control={editForm.control}
              label="Name"
              name="name"
              placeholder="Enter form name"
            />
            <FormTextarea
              control={editForm.control}
              label="Description"
              name="description"
              placeholder="Enter form description"
            />
            <Button onClick={onSubmitEditForm}>Update form</Button>
          </FormWrapper>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking form? This action
              cannot be undone.
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
