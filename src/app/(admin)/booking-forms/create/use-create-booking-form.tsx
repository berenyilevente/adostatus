'use client';

import { Form } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';
import {
  createEmptyField,
  fields as availableFields,
} from '../booking-form.helper';

export type EditorField = ReturnType<typeof createEmptyField> & { id: string };

type HookProp = {
  formsData: Form[];
};

function useCreateBookingFormHook({ formsData }: HookProp) {
  const [editorFields, setEditorFields] = useState<EditorField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Add a new field to the editor
  const addField = (fieldType: string) => {
    const order = editorFields.length;
    const newField = {
      ...createEmptyField(fieldType, order),
      id: `${fieldType}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
    setEditorFields((prev) => [...prev, newField]);
  };

  // Select a field for editing
  const selectField = (id: string) => {
    setSelectedFieldId(id);
    setModalOpen(true);
  };

  // Edit a field's properties
  const editField = (id: string, updates: Partial<EditorField>) => {
    setEditorFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  // Remove a field
  const removeField = (id: string) => {
    setEditorFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  // Add another field after a given field
  const addFieldAfter = (afterId: string, fieldType: string) => {
    const idx = editorFields.findIndex((f) => f.id === afterId);
    if (idx === -1) return;
    const newField = {
      ...createEmptyField(fieldType, idx + 1),
      id: `${fieldType}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
    setEditorFields((prev) => [
      ...prev.slice(0, idx + 1),
      newField,
      ...prev.slice(idx + 1),
    ]);
    setSelectedFieldId(newField.id);
    setModalOpen(true);
  };

  // Modal controls
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const selectedField =
    editorFields.find((f) => f.id === selectedFieldId) || null;

  return {
    editorFields,
    addField,
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
  };
}

export const [useCreateBookingForm, CreateBookingFormProvider] =
  createAppContext(useCreateBookingFormHook);
