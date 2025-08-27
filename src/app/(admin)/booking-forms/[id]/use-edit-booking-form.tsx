'use client';

import { FieldVariant, Form, FormField } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { ReactElement, useState } from 'react';
import {
  createEmptyFormField,
  CreateFormField,
  FormFieldOption,
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
import { upsertBookingFormFields } from '../actions/booking-form.actions';
import { toast } from 'sonner';

export type FormFieldItem = ReturnType<typeof createEmptyFormField> & {
  tempId: string;
};

type HookProp = {
  formsData: Form | null;
  formFieldsData: FormField[] | null;
};

function useEditBookingFormHook({ formsData, formFieldsData }: HookProp) {
  const defaultEditorFields = formFieldsData?.map((field) => [
    {
      ...field,
      tempId: crypto.randomUUID(),
      options: field.options as FormFieldOption[],
    },
  ]);
  const [editorFields, setEditorFields] = useState<FormFieldItem[][]>(
    defaultEditorFields || []
  );
  const [selectedFieldTempId, setSelectedFieldTempId] = useState<string | null>(
    null
  );
  const formId = formsData?.id;
  const selectedField =
    editorFields.flat().find((field) => field.tempId === selectedFieldTempId) ||
    null;

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

  const addFieldToRow = (rowIdx: number, fieldType: string) => {};

  const addField = (fieldVariant: FieldVariant) => {
    if (!formId) {
      return;
    }

    const newField: FormFieldItem = {
      ...createEmptyFormField({ fieldVariant, fieldOrder: 0, formId }),
      tempId: crypto.randomUUID(),
    };
    setEditorFields((prev) => [...prev, [newField]]);
  };

  const removeField = (tempId: string) => {
    setEditorFields((prev) =>
      prev
        .map((row) => row.filter((field) => field.tempId !== tempId))
        .filter((row) => row.length > 0)
    );

    if (selectedFieldTempId === tempId) {
      setSelectedFieldTempId(null);
    }
  };

  const editField = (tempId: string, updates: Partial<FormFieldItem>) => {
    setEditorFields((prev) =>
      prev.map((row) =>
        row.map((field) =>
          field.tempId === tempId ? { ...field, ...updates } : field
        )
      )
    );
  };

  const renderPreviewField = (field: FormFieldItem) => {
    const commonProps = {
      control: previewForm.control,
      name: field.label,
      label: field.label,
      description: field.helpText || '',
      placeholder: field.placeholder || '',
      options: field.options,
      required: field.isRequired,
      className: 'w-full',
    };

    const fieldVariantMap: Record<FieldVariant, ReactElement> = {
      TEXT_INPUT: <FormInput {...commonProps} key={field.label} />,
      CHECKBOX: <FormCheckbox {...commonProps} key={field.label} />,
      COMBOBOX: <FormCombobox {...commonProps} key={field.label} />,
      SELECT: <FormSelect {...commonProps} key={field.label} />,
      DATEPICKER: <FormDatepicker {...commonProps} key={field.label} />,
      TEXTAREA: <FormTextarea {...commonProps} key={field.label} />,
      SWITCH: <FormSwitch {...commonProps} key={field.label} />,
      MULTISELECT: <FormMultiselect {...commonProps} key={field.label} />,
      COLOR_PICKER: <FormColorPicker {...commonProps} key={field.label} />,
      TAG_INPUT: <FormTagInput {...commonProps} key={field.label} />,
      TIMEPICKER: <FormTimepicker {...commonProps} key={field.label} />,
    };

    return fieldVariantMap[field.fieldVariant];
  };

  const createFormFieldPayload = (
    editorFields: FormFieldItem[][]
  ): CreateFormField[] => {
    if (!formsData?.id) {
      toast.error('Form ID not found');
      return [];
    }

    return editorFields.flat().map((field) => ({
      formId: formsData.id,
      fieldVariant: field.fieldVariant,
      label: field?.label,
      placeholder: field?.placeholder,
      helpText: field?.helpText,
      isRequired: field?.isRequired,
      defaultValue: field?.defaultValue,
      validationRules: field?.validationRules,
      fieldOrder: field?.fieldOrder,
      options: field?.options,
    }));
  };

  const formFields: CreateFormField[] = createFormFieldPayload(editorFields);

  const onSubmit = async () => {
    if (!formsData?.id) {
      toast.error('Form ID not found');
      return;
    }

    const response = await upsertBookingFormFields(formFields);

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
    addField,
    editField,
    removeField,
    selectedField,
    selectedFieldTempId,
    createForm,
    previewForm,
    renderPreviewField,
    onSubmit,
    setSelectedFieldTempId,
  };
}

export const [useEditBookingForm, EditBookingFormProvider] = createAppContext(
  useEditBookingFormHook
);
