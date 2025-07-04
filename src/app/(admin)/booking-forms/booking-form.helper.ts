import { z } from 'zod';

import { Form as FormTable, FormField, Prisma } from '@/generated/prisma';

export type CreateBookingForm = Omit<
  FormTable,
  'id' | 'createdAt' | 'updatedAt'
>;

export const FormSchema = z.object({
  id: z.string().optional(),
  businessId: z.string(),
  name: z.string().min(1, 'Form name is required'),
  description: z.string().optional(),
  isTemplate: z.boolean().default(false),
  templateType: z.string().optional(),
  confirmationMessage: z.string().optional(),
  redirectUrl: z.string().url().optional().or(z.literal('')),
  allowCancellation: z.boolean().default(true),
  cancellationNoticeHours: z.number().int().default(24),
  isActive: z.boolean().default(true),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export const fields = [
  { key: 'checkbox', label: 'Checkbox' },
  { key: 'combobox', label: 'Combobox' },
  { key: 'datepicker', label: 'Datepicker' },
  { key: 'text-input', label: 'Text Input' },
  { key: 'radio-group', label: 'Radio Group' },
  { key: 'select', label: 'Select' },
  { key: 'switch', label: 'Switch' },
  { key: 'textarea', label: 'Textarea' },
  { key: 'timepicker', label: 'Timepicker' },
  { key: 'color-picker', label: 'Color Picker' },
  { key: 'tag-input', label: 'Tag Input' },
  { key: 'multiselect', label: 'Multiselect' },
  { key: 'file-input', label: 'File Input' },
] as const;

export const FormFieldSchema = z.object({
  id: z.string().optional(),
  formId: z.string().optional(),
  fieldType: z.enum(fields.map((field) => field.key) as [string, ...string[]]),
  label: z.string().min(1, 'Field label is required'),
  placeholder: z.string().optional(),
  helpText: z.string().optional(),
  isRequired: z.boolean().default(false),
  fieldOrder: z.number().int(),
  defaultValue: z.string().optional(),
  options: z.any().optional(), // For select, radio, checkbox options
  validationRules: z.any().optional(), // JSON with validation rules
});

export type FormFieldSchemaType = z.infer<typeof FormFieldSchema>;

type CreateFormField = Omit<FormField, 'id' | 'createdAt' | 'updatedAt'>;

export const createEmptyField = (
  fieldType: string,
  order: number
): CreateFormField => {
  return {
    fieldType: fieldType as any,
    label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`,
    placeholder: '',
    helpText: '',
    isRequired: false,
    fieldOrder: order,
    defaultValue: '',
    options: [],
    validationRules: [],
    formId: '',
  };
};
