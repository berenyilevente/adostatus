'use client';

import { Form } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';

import { useState } from 'react';
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

  return {
    formData,
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
