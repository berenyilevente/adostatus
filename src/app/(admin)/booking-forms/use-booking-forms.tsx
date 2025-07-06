'use client';

import { useForm } from 'react-hook-form';

import { Business, Form, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState } from 'react';
import { getServices } from '../business/actions/business.actions';
import {
  createBookingForm,
  deleteBookingForm,
  updateBookingForm,
} from './actions';
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

  const createForm = useForm<CreateBookingForm>({
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

  const businessOptions = businessData.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  // If add service, render the create service form below the select
  const serviceOptions = [
    ...services.map((service) => ({
      label: service.name,
      value: service.id,
    })),
  ];

  const search = filterForm.watch('search');
  const businessId = createForm.watch('businessId');

  const getServicesFromBusiness = async (businessId: string) => {
    const response = await getServices(businessId);
    if (response.status === 'success' && response.data) {
      setServices(response.data);
    }
  };

  useEffect(() => {
    if (businessId) {
      getServicesFromBusiness(businessId);
    }
  }, [businessId]);

  const onSubmitBookingForm = createForm.handleSubmit(
    async (data: CreateBookingForm) => {
      await createBookingForm(data);
    }
  );

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
    createForm,
    editForm,
    serviceOptions,
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
  };
};

const [useBookingForms, BookingFormsProvider] = createAppContext(useHook);

export { useBookingForms, BookingFormsProvider };
