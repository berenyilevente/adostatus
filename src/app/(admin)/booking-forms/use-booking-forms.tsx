'use client';

import { useForm } from 'react-hook-form';

import { Business, Form } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';
import { BookingForm, deleteBookingForm, updateBookingForm } from './actions';
import { CreateBookingForm } from './booking-form.helper';
import { ServiceWithForm } from '../business-services/actions/business-services.actions';

type HookProp = {
  bookingForms: BookingForm[];
  businesses: Business[];
  services: ServiceWithForm[];
};

const useHook = ({ bookingForms, businesses, services }: HookProp) => {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const filterForm = useForm({
    defaultValues: {
      search: '',
      business: '',
      status: '',
    },
  });

  const editForm = useForm<CreateBookingForm>({
    defaultValues: {
      businessId: '',
      name: '',
      description: '',
      isTemplate: false,
      templateType: '',
      confirmationMessage: '',
      url: '',
      allowCancellation: true,
      cancellationNoticeHours: 24,
    },
  });

  const statusOptions = [
    { label: 'Draft', value: 'draft' },
    { label: 'Live', value: 'live' },
    { label: 'Archived', value: 'archived' },
    { label: 'All', value: 'all' },
  ];

  const search = filterForm.watch('search');

  const businessOptions = businesses?.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  const serviceOptions = services
    ?.filter((service) => !service.form)
    .map((service) => ({
      label: service.name,
      value: service.id,
    }));

  const toggleCreateFormSheet = () => {
    document.getElementById('create-booking-form-trigger')?.click();
  };

  const onSubmitEditForm = editForm.handleSubmit(
    async (data: CreateBookingForm) => {
      if (editingForm) {
        await updateBookingForm(editingForm.id, data);
        setIsEditSheetOpen(false);
        setEditingForm(null);
      }
    }
  );

  const handleEditForm = (form: Form) => {
    setEditingForm(form);
    editForm.reset({
      businessId: form.businessId,
      name: form.name,
      description: form.description || '',
      isTemplate: form.isTemplate,
      templateType: form.templateType || '',
      confirmationMessage: form.confirmationMessage || '',
      url: form.url || '',
      allowCancellation: form.allowCancellation,
      cancellationNoticeHours: form.cancellationNoticeHours,
    });
    setIsEditSheetOpen(true);
  };

  const handleDeleteForm = (id: string) => {
    setFormToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (formToDelete) {
      await deleteBookingForm(formToDelete);
      setIsDeleteDialogOpen(false);
      setFormToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setFormToDelete(null);
  };

  return {
    bookingForms,
    search,
    filterForm,
    editForm,
    statusOptions,
    onSubmitEditForm,
    toggleCreateFormSheet,
    isEditSheetOpen,
    setIsEditSheetOpen,
    editingForm,
    handleEditForm,
    handleDeleteForm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    confirmDelete,
    cancelDelete,
    businessOptions,
    serviceOptions,
  };
};

const [useBookingForms, BookingFormsProvider] = createAppContext(useHook);

export { BookingFormsProvider, useBookingForms };
