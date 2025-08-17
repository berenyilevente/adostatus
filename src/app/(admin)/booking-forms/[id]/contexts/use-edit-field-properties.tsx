'use client';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState } from 'react';
import {
  createEmptyFormField,
  CreateFormField,
} from '../../booking-form.helper';

import { useEditBookingForm } from '../use-edit-booking-form';
import { toast } from 'sonner';

export type FormFieldItem = ReturnType<typeof createEmptyFormField>;

type HookProp = {
  field: CreateFormField | null;
};

function useEditFieldPropertiesHook({ field }: HookProp) {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<CreateFormField | null>(null);

  const {
    selectedField,
    selectedFieldTempId,
    editField,
    setSelectedFieldTempId,
  } = useEditBookingForm();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!selectedField) {
      return;
    }

    setFieldToEdit({ ...selectedField });
  }, [selectedField, modalOpen]);

  const handleEditFieldOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFieldToEdit((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveModal = () => {
    if (!selectedFieldTempId || !fieldToEdit) {
      toast.error('No field to edit');
      return;
    }

    editField(selectedFieldTempId, fieldToEdit);
    closeModal();
  };

  const selectField = (tempId: string) => {
    setSelectedFieldTempId(tempId);
    openModal();
  };

  return {
    modalOpen,
    fieldToEdit,
    openModal,
    closeModal,
    setFieldToEdit,
    handleEditFieldOnChange,
    handleSaveModal,
    selectField,
  };
}

export const [useEditFieldProperties, EditFieldPropertiesProvider] =
  createAppContext(useEditFieldPropertiesHook);
