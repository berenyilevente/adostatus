'use client';

import { Business, Form, FormField, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { ReactElement, useEffect, useState } from 'react';
import {
  createEmptyField,
  fields as availableFields,
  CreateFormField,
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
import { createBookingFormFields } from '../actions/booking-form.actions';
import { toast } from 'sonner';

export type EditorField = ReturnType<typeof createEmptyField> & { id: string };

type HookProp = {
  formsData: Form | null;
  formFields: FormField[] | null;
};

function useEditBookingFormHook({ formsData, formFields }: HookProp) {
  const [editorFields, setEditorFields] = useState<EditorField[][]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState<any>(null);

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

  const previewForm = useForm({
    mode: 'onChange',
  });

  const remapFormFields = (fields: FormField[]): EditorField[][] => {
    if (!fields?.length) {
      return [];
    }

    // Sort fields by fieldOrder to ensure correct positioning
    const sortedFields = [...fields].sort(
      (a, b) => a.fieldOrder - b.fieldOrder
    );

    // Group fields into rows (assuming 1 field per row for now)
    // You can modify this logic if you want multiple fields per row
    return sortedFields.map((field) => [
      {
        ...field,
        id: `${field.fieldType}_${field.id}`, // Create a unique ID for the editor
        options: field.options || [],
        validationRules: field.validationRules || [],
      },
    ]);
  };

  useEffect(() => {
    if (!formFields?.length) {
      return;
    }

    setEditorFields(remapFormFields(formFields));
  }, [formFields]);

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const selectedField =
    editorFields.flat().find((f) => f.id === selectedFieldId) || null;

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

  const flattenFields = (editorFields: EditorField[][]): CreateFormField[] => {
    if (!formsData?.id) {
      toast.error('Form ID not found');
      return [];
    }

    return editorFields.flat().map((field) => ({
      formId: formsData.id,
      fieldType: field.fieldType,
      label: field?.label,
      placeholder: field?.placeholder,
      helpText: field?.helpText,
      isRequired: field?.isRequired,
      defaultValue: field?.defaultValue,
      options: field?.options,
      validationRules: field?.validationRules,
      fieldOrder: field?.fieldOrder,
    }));
  };

  const createFormField: CreateFormField[] = flattenFields(editorFields);

  const onSubmit = async () => {
    if (!formsData?.id) {
      toast.error('Form ID not found');
      return;
    }

    const response = await createBookingFormFields(createFormField);

    if (response.status === 'success') {
      toast.success('Form fields saved successfully');
      return;
    }

    if (response.error) {
      toast.error('Error saving form fields');
      return;
    }
  };

  return {
    editorFields,
    addFieldToRow,
    addRowWithField,
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
    onSubmit,
  };
}

export const [useEditBookingForm, EditBookingFormProvider] = createAppContext(
  useEditBookingFormHook
);
