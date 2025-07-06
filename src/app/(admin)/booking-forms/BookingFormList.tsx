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
  SheetTrigger,
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

export const BookingFormList = (): ReactElement => {
  const router = useRouter();
  const {
    bookingForms,
    filterForm,
    createForm,
    editForm,
    businessOptions,
    statusOptions,
    onSubmitBookingForm,
    onSubmitEditForm,
    isEditSheetOpen,
    setIsEditSheetOpen,
    editingForm,
    handleEditForm,
    handleDeleteForm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    confirmDelete,
    cancelDelete,
  } = useBookingForms();

  const statusColorMap = {
    draft: 'bg-slate-500 text-white',
    live: 'bg-green-500 text-white',
    archived: 'bg-yellow-500 text-white',
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
        <Sheet>
          <SheetTrigger asChild>
            <Button startIcon="plus" size="sm" iconSize="xs" color="primary">
              Create a new booking form
            </Button>
          </SheetTrigger>
          <SheetContent className="h-full w-[500px]">
            <SheetHeader>
              <SheetTitle>Create a new booking form</SheetTitle>
              <SheetDescription>
                Create a new booking form by selecting a business and a service
                and then giving it a name.
              </SheetDescription>
            </SheetHeader>
            <FormWrapper
              form={createForm}
              className="flex gap-4 flex-col w-full mt-6"
            >
              <FormSelect
                control={createForm.control}
                label="Business"
                name="businessId"
                placeholder="Select business..."
                options={businessOptions}
              />
              {/* <FormSelect
                control={createForm.control}
                label="Service"
                name="service"
                placeholder="Select service..."
                options={serviceOptions}
              /> */}
              <FormInput
                control={createForm.control}
                label="Name"
                name="name"
                placeholder="Enter form name"
              />
              <FormTextarea
                control={createForm.control}
                label="Description"
                name="description"
                placeholder="Enter form description"
              />
              <Button onClick={onSubmitBookingForm}>Create form</Button>
            </FormWrapper>
          </SheetContent>
        </Sheet>
      </div>
      {bookingForms.map((bookingForm) => (
        <Card className="bg-white" key={bookingForm.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Badge
                  className={cn(
                    statusColorMap[
                      bookingForm.status as keyof typeof statusColorMap
                    ],
                    'hover:cursor-pointer'
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
      ))}

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
