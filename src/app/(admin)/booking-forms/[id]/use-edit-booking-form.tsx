'use client';

import { Business, Form, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { ReactElement, useEffect, useState } from 'react';
import {
  createEmptyField,
  fields as availableFields,
} from '../booking-form.helper';
import { useForm } from 'react-hook-form';
import {
  FormCheckbox,
  FormCombobox,
  FormSelect,
  FormDatepicker,
  FormTextarea,
  FormSwitch,
  FormMultiselect,
  FormColorPicker,
  FormTagInput,
  FormTimepicker,
  FormInput,
} from '@/components';
import React from 'react';

export type EditorField = ReturnType<typeof createEmptyField> & { id: string };

type HookProp = {
  formsData: Form | null;
  businessData: Business[];
};

function useEditBookingFormHook({ formsData, businessData }: HookProp) {
  const [editorFields, setEditorFields] = useState<EditorField[][]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const createForm = useForm({
    defaultValues: {
      business: formsData?.businessId || '',
      name: formsData?.name || '',
      description: formsData?.description || '',
      isTemplate: formsData?.isTemplate || false,
      templateType: formsData?.templateType || '',
      confirmationMessage: formsData?.confirmationMessage || '',
      redirectUrl: formsData?.redirectUrl || '',
      allowCancellation: formsData?.allowCancellation || true,
    },
  });

  const businessId = createForm.watch('business');

  const addFieldToRow = (rowIdx: number, fieldType: string) => {
    setEditorFields((prev) => {
      const newField: EditorField = {
        ...createEmptyField(
          fieldType,
          prev[rowIdx]?.length || 0,
          formsData?.id || ''
        ),
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
      ...createEmptyField(fieldType, 0, formsData?.id || ''),
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
        ...createEmptyField(fieldType, idx + 1, formsData?.id || ''),
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

  const [modalForm, setModalForm] = useState<any>(null);

  const previewForm = useForm({
    mode: 'onChange',
    defaultValues: React.useMemo(() => {
      const values: Record<string, any> = {};
      editorFields.flat().forEach((field) => {
        values[field.id] = field.defaultValue || '';
      });
      return values;
    }, [editorFields]),
  });

  useEffect(() => {
    if (selectedField) {
      setModalForm({ ...selectedField });
    }
  }, [selectedField, modalOpen]);

  const handleModalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModalForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveModal = () => {
    if (selectedFieldId && modalForm) {
      editField(selectedFieldId, modalForm);
      closeModal();
    }
  };

  const renderPreviewField = (field: any) => {
    const commonProps = {
      control: previewForm.control,
      name: field.id,
      label: field.label,
      description: field.helpText,
      placeholder: field.placeholder,
      options: field.options || [],
      required: !!field.isRequired,
      disabled: !!field.disabled,
      className: 'w-full',
    };

    const fieldTypeMap: Record<string, ReactElement> = {
      'text-input': <FormInput {...commonProps} key={field.id} />,
      checkbox: <FormCheckbox {...commonProps} key={field.id} />,
      combobox: <FormCombobox {...commonProps} key={field.id} />,
      select: <FormSelect {...commonProps} key={field.id} />,
      datepicker: <FormDatepicker {...commonProps} key={field.id} />,
      textarea: <FormTextarea {...commonProps} key={field.id} />,
      switch: <FormSwitch {...commonProps} key={field.id} />,
      multiselect: <FormMultiselect {...commonProps} key={field.id} />,
      'color-picker': <FormColorPicker {...commonProps} key={field.id} />,
      'tag-input': <FormTagInput {...commonProps} key={field.id} />,
      timepicker: <FormTimepicker {...commonProps} key={field.id} />,
    };

    return fieldTypeMap[field.fieldType];
  };

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
    createForm,
    previewForm,
    renderPreviewField,
    modalForm,
    handleSaveModal,
    handleModalChange,
    setModalForm,
  };
}

export const [useEditBookingForm, EditBookingFormProvider] = createAppContext(
  useEditBookingFormHook
);
