'use client';

import { Form } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { updateFormContent as updateFormContentAction } from '../actions';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { FormElementInstance } from './edit-form.helper';

type HookProp = {
  formData: Form | null;
};

function useEditBookingFormHook({ formData }: HookProp) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setSelectedElement(null);
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((e) => e.id === id);
      newElements[index] = element;

      return newElements;
    });
  };
  const [loading, startTransition] = useTransition();

  const saveForm = async () => {
    if (!formData?.id) {
      throw new Error('Form ID not found');
    }

    const JsonElements = JSON.stringify(elements);

    const response = await updateFormContentAction(formData.id, JsonElements);
    if (response.status === 'success') {
      toast.success('Form content updated successfully');
      setSelectedElement(null);
      return;
    }

    if (response.status === 'error') {
      toast.error(response.error);
      return;
    }
  };

  return {
    formData,
    saveForm,
    loading,
    startTransition,
    elements,
    setElements,
    selectedElement,
    setSelectedElement,
    addElement,
    removeElement,
    updateElement,
  };
}

export const [useEditBookingForm, EditBookingFormProvider] = createAppContext(
  useEditBookingFormHook
);
