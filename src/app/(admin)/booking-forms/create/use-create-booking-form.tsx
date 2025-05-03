"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/generated/prisma";
import {
  createEmptyField,
  FormFieldSchemaType,
  FormSchemaType,
} from "../booking-form.helper";
import { createForm } from "../actions";
import { toast } from "sonner";
import { createAppContext } from "@/hooks/use-create-app-context";

type DragItem = {
  id: string;
  type: string;
};

type HookProp = {
  formsData: Form[];
  initialForm?: Form & { fields: FormFieldSchemaType[] };
};

function useCreateBookingFormHook({ formsData, initialForm }: HookProp) {
  const router = useRouter();
  const [forms] = useState<Form[]>(formsData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState(
    initialForm || {
      businessId: "", // This would be set from the user's context in a real app
      name: "New Form",
      description: "",
      isTemplate: false,
      allowCancellation: true,
      cancellationNoticeHours: 24,
      isActive: true,
    }
  );

  // Form fields state
  const [formFields, setFormFields] = useState<FormFieldSchemaType[]>(
    initialForm?.fields || []
  );

  // Toggle preview mode
  const togglePreview = useCallback(() => {
    setIsPreviewMode(!isPreviewMode);
  }, [isPreviewMode]);

  // Update form data
  const updateFormData = useCallback(
    (key: keyof FormSchemaType, value: any) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Add a new field
  const addField = useCallback(
    (fieldType: string) => {
      const newField = createEmptyField(fieldType, formFields.length);
      setFormFields((prev) => [...prev, newField]);
    },
    [formFields]
  );

  // Update a field
  const updateField = useCallback(
    (index: number, field: Partial<FormFieldSchemaType>) => {
      setFormFields((prev) => {
        const newFields = [...prev];
        newFields[index] = { ...newFields[index], ...field };
        return newFields;
      });
    },
    []
  );

  // Remove a field
  const removeField = useCallback((index: number) => {
    setFormFields((prev) => {
      const newFields = [...prev];
      newFields.splice(index, 1);
      // Update field orders
      return newFields.map((field, idx) => ({ ...field, fieldOrder: idx }));
    });
  }, []);

  // Reorder fields (for drag and drop)
  const reorderFields = useCallback((startIndex: number, endIndex: number) => {
    setFormFields((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      // Update field orders
      return result.map((field, idx) => ({ ...field, fieldOrder: idx }));
    });
  }, []);

  // Save the form
  const saveForm = useCallback(async () => {
    setIsSaving(true);
    try {
      const formToSave = {
        ...formData,
        fields: formFields,
      };

      const response = await createForm(formToSave);

      if (response.status === "success") {
        toast.success("Form saved successfully");
        router.push("/form-builder");
        router.refresh();
      } else {
        toast.error(response.errors || "Failed to save form");
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  }, [formData, formFields, router]);

  return {
    forms,
    formData,
    formFields,
    isPreviewMode,
    isSaving,
    togglePreview,
    updateFormData,
    addField,
    updateField,
    removeField,
    reorderFields,
    saveForm,
  };
}

export const [useCreateBookingForm, CreateBookingFormProvider] =
  createAppContext(useCreateBookingFormHook);
