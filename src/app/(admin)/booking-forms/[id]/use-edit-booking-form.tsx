'use client';

import { Form, FormField } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { ReactElement, useState } from 'react';
import {
  createEmptyFormField,
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

export type FormFieldItem = ReturnType<typeof createEmptyFormField> & {
  tempId: string;
};

type HookProp = {
  formsData: Form | null;
  formFieldsData: FormField[] | null;
};

function useEditBookingFormHook({ formsData, formFieldsData }: HookProp) {
  const [editorFields, setEditorFields] = useState<FormFieldItem[][]>([]);
  const [selectedFieldTempId, setSelectedFieldTempId] = useState<string | null>(
    null
  );
  const formId = formsData?.id;

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

  const addField = (fieldType: string) => {
    if (!formId) {
      return;
    }

    const newField: FormFieldItem = {
      ...createEmptyFormField({ fieldType, fieldOrder: 0, formId }),
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

  const selectedField =
    editorFields.flat().find((field) => field.tempId === selectedFieldTempId) ||
    null;

  const renderPreviewField = (field: FormFieldItem) => {
    const commonProps = {
      control: previewForm.control,
      name: field.label,
      label: field.label,
      description: field.helpText || '',
      placeholder: field.placeholder || '',
      options: field.options || [],
      required: !!field.isRequired,
      className: 'w-full',
    };

    const fieldTypeMap: Record<string, ReactElement> = {
      'text-input': <FormInput {...commonProps} key={field.label} />,
      checkbox: <FormCheckbox {...commonProps} key={field.label} />,
      combobox: <FormCombobox {...commonProps} key={field.label} />,
      select: <FormSelect {...commonProps} key={field.label} />,
      datepicker: <FormDatepicker {...commonProps} key={field.label} />,
      textarea: <FormTextarea {...commonProps} key={field.label} />,
      switch: <FormSwitch {...commonProps} key={field.label} />,
      multiselect: (
        <FormMultiselect
          {...commonProps}
          options={field.options || []}
          key={field.label}
        />
      ),
      'color-picker': <FormColorPicker {...commonProps} key={field.label} />,
      'tag-input': <FormTagInput {...commonProps} key={field.label} />,
      timepicker: <FormTimepicker {...commonProps} key={field.label} />,
    };

    return fieldTypeMap[field.fieldType];
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

  const formFields: CreateFormField[] = createFormFieldPayload(editorFields);

  const onSubmit = async () => {
    if (!formsData?.id) {
      toast.error('Form ID not found');
      return;
    }

    const response = await createBookingFormFields(formFields);

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
    availableFields,
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
