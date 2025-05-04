"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form, Prisma } from "@/generated/prisma";

import { createAppContext } from "@/hooks/use-create-app-context";

import {
  createEmptyField,
  FormFieldSchemaType,
  FormSchemaType,
} from "../booking-form.helper";
import { createForm } from "../actions";

type HookProp = {
  formsData: Form[];
  initialForm?: Prisma.FormCreateInput;
};

function useCreateBookingFormHook({ formsData, initialForm }: HookProp) {
  const router = useRouter();
  const [forms] = useState<Form[]>(formsData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Prisma.FormCreateInput>(
    initialForm || {
      name: "New Form",
      description: "",
      isTemplate: false,
      allowCancellation: true,
      cancellationNoticeHours: 24,
      isActive: true,
      redirectUrl: "",
      confirmationMessage: "",
      business: {
        connect: {
          id: "1",
        },
      },
    }
  );

  const [formFields, setFormFields] = useState<Prisma.FormFieldCreateInput[]>(
    []
  );

  // Toggle preview mode
  const togglePreview = useCallback(() => {
    setIsPreviewMode(!isPreviewMode);
  }, [isPreviewMode]);

  const updateFormData = useCallback(
    (key: keyof FormSchemaType, value: any) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const addField = useCallback(
    (fieldType: string) => {
      const newField = createEmptyField(fieldType, formFields.length);
      setFormFields((prev) => [...prev, newField]);
    },
    [formFields]
  );

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

  const removeField = useCallback((index: number) => {
    setFormFields((prev) => {
      const newFields = [...prev];
      newFields.splice(index, 1);
      // Update field orders
      return newFields.map((field, idx) => ({ ...field, fieldOrder: idx }));
    });
  }, []);

  const reorderFields = useCallback((startIndex: number, endIndex: number) => {
    setFormFields((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      // Update field orders
      return result.map((field, idx) => ({ ...field, fieldOrder: idx }));
    });
  }, []);

  // TODO implement this function to enable adding a field to a specific row
  const addFieldToRow = useCallback(
    (index: number, fieldType: string) => {},
    []
  );

  const saveForm = useCallback(async () => {
    setIsSaving(true);
    try {
      const response = await createForm(formData, formFields);

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
    addFieldToRow,
  };
}

export const [useCreateBookingForm, CreateBookingFormProvider] =
  createAppContext(useCreateBookingFormHook);
