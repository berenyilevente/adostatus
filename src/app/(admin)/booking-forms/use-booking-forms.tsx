'use client';

import { useForm } from 'react-hook-form';

import { Business, Form, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';
import { getServices } from '../business-services/actions/business-services.actions';
import { deleteBookingForm, updateBookingForm } from './actions';
import { CreateBookingForm } from './booking-form.helper';

type HookProp = {
  bookingForms: Form[];
  businessData: Business[];
};

const useHook = ({ bookingForms, businessData }: HookProp) => {
  const [services, setServices] = useState<Service[]>([]);
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
      redirectUrl: '',
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

  const businessOptions = businessData.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  const toggleCreateFormSheet = () => {
    document.getElementById('create-booking-form-trigger')?.click();
  };

  const getServicesFromBusiness = async (businessId: string) => {
    const response = await getServices(businessId);
    if (response.status === 'success' && response.data) {
      setServices(response.data);
    }
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
      redirectUrl: form.redirectUrl || '',
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
    businessData,
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
  };
};

const [useBookingForms, BookingFormsProvider] = createAppContext(useHook);

export { useBookingForms, BookingFormsProvider };
