import { z } from "zod";

import { Form, FormField, Prisma } from "@/generated/prisma";

export const FIELD_TYPE = "form-field";

// Form schema for validation
export const formSchema = z.object({
  id: z.string().optional(),
  businessId: z.string(),
  name: z.string().min(1, "Form name is required"),
  description: z.string().optional(),
  isTemplate: z.boolean().default(false),
  templateType: z.string().optional(),
  confirmationMessage: z.string().optional(),
  redirectUrl: z.string().url().optional().or(z.literal("")),
  allowCancellation: z.boolean().default(true),
  cancellationNoticeHours: z.number().int().default(24),
  isActive: z.boolean().default(true),
});

export type FormSchemaType = z.infer<typeof formSchema>;

// Field types for the form builder
export const fieldTypes = [
  { id: "text", label: "Text Input" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone Number" },
  { id: "select", label: "Dropdown" },
  { id: "radio", label: "Radio Buttons" },
  { id: "checkbox", label: "Checkboxes" },
  { id: "date", label: "Date Picker" },
  { id: "time", label: "Time Picker" },
  { id: "textarea", label: "Text Area" },
  { id: "number", label: "Number" },
] as const;

// Form field schema for validation
export const formFieldSchema = z.object({
  id: z.string().optional(),
  formId: z.string().optional(),
  fieldType: z.enum(fieldTypes.map((type) => type.id) as [string, ...string[]]),
  label: z.string().min(1, "Field label is required"),
  placeholder: z.string().optional(),
  helpText: z.string().optional(),
  isRequired: z.boolean().default(false),
  fieldOrder: z.number().int(),
  defaultValue: z.string().optional(),
  options: z.any().optional(), // For select, radio, checkbox options
  validationRules: z.any().optional(), // JSON with validation rules
});

export type FormFieldSchemaType = z.infer<typeof formFieldSchema>;

// Helper function to create a new empty field
export const createEmptyField = (
  fieldType: string,
  order: number
): Prisma.FormFieldCreateInput => {
  return {
    fieldType: fieldType as any,
    label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`,
    placeholder: "",
    helpText: "",
    isRequired: false,
    fieldOrder: order,
    defaultValue: "",
    options:
      fieldType === "select" ||
      fieldType === "radio" ||
      fieldType === "checkbox"
        ? [{ label: "Option 1", value: "option1" }]
        : undefined,
    form: {
      connect: {
        id: "1",
      },
    },
  };
};
