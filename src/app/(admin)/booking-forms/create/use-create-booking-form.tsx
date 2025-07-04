'use client';

import { Business, Form, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState } from 'react';
import {
  createEmptyField,
  fields as availableFields,
} from '../booking-form.helper';
import { useForm } from 'react-hook-form';
import { getServices } from '../../business/actions/business.actions';

export type EditorField = ReturnType<typeof createEmptyField> & { id: string };

type HookProp = {
  formsData: Form[];
  businessData: Business[];
};

function useCreateBookingFormHook({ formsData, businessData }: HookProp) {
  const [editorFields, setEditorFields] = useState<EditorField[][]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filterForm = useForm({
    defaultValues: {
      business: '',
      service: '',
      title: '',
    },
  });

  const businessOptions = businessData.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  const serviceOptions = services.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const businessId = filterForm.watch('business');

  const addFieldToRow = (rowIdx: number, fieldType: string) => {
    setEditorFields((prev) => {
      const newField: EditorField = {
        ...createEmptyField(fieldType, prev[rowIdx]?.length || 0),
        id: `${fieldType}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      };
      const newRows = [...prev];
      if (!newRows[rowIdx]) newRows[rowIdx] = [];
      newRows[rowIdx] = [...newRows[rowIdx], newField];
      return newRows;
    });
  };

  const addRowWithField = (fieldType: string) => {
    const newField: EditorField = {
      ...createEmptyField(fieldType, 0),
      id: `${fieldType}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
    setEditorFields((prev) => [...prev, [newField]]);
  };

  const removeField = (id: string) => {
    setEditorFields((prev) =>
      prev
        .map((row) => row.filter((f) => f.id !== id))
        .filter((row) => row.length > 0)
    );
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const selectField = (id: string) => {
    setSelectedFieldId(id);
    setModalOpen(true);
  };

  const editField = (id: string, updates: Partial<EditorField>) => {
    setEditorFields((prev) =>
      prev.map((row) =>
        row.map((f) => (f.id === id ? { ...f, ...updates } : f))
      )
    );
  };

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

  const addFieldAfter = (
    rowIdx: number,
    afterId: string,
    fieldType: string
  ) => {
    setEditorFields((prev) => {
      const row = prev[rowIdx] || [];
      const idx = row.findIndex((f) => f.id === afterId);
      if (idx === -1) return prev;
      const newField: EditorField = {
        ...createEmptyField(fieldType, idx + 1),
        id: `${fieldType}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      };
      const newRow = [
        ...row.slice(0, idx + 1),
        newField,
        ...row.slice(idx + 1),
      ];
      const newRows = [...prev];
      newRows[rowIdx] = newRow;
      return newRows;
    });
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const selectedField =
    editorFields.flat().find((f) => f.id === selectedFieldId) || null;

  return {
    editorFields,
    addFieldToRow,
    addRowWithField,
    addFieldAfter,
    selectField,
    editField,
    removeField,
    selectedField,
    selectedFieldId,
    modalOpen,
    openModal,
    closeModal,
    availableFields,
    businessOptions,
    filterForm,
    serviceOptions,
  };
}

export const [useCreateBookingForm, CreateBookingFormProvider] =
  createAppContext(useCreateBookingFormHook);
