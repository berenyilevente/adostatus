import { z } from 'zod';

import { Form as FormTable, FormField, FieldVariant } from '@/generated/prisma';

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

export const fields: { key: FieldVariant; label: string }[] = [
  { key: 'CHECKBOX', label: 'Checkbox' },
  { key: 'COMBOBOX', label: 'Combobox' },
  { key: 'DATEPICKER', label: 'Datepicker' },
  { key: 'TEXT_INPUT', label: 'Text Input' },
  { key: 'SELECT', label: 'Select' },
  { key: 'SWITCH', label: 'Switch' },
  { key: 'TEXTAREA', label: 'Textarea' },
  { key: 'TIMEPICKER', label: 'Timepicker' },
  { key: 'COLOR_PICKER', label: 'Color Picker' },
  { key: 'TAG_INPUT', label: 'Tag Input' },
  { key: 'MULTISELECT', label: 'Multiselect' },
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

export type FormFieldOption = {
  label: string;
  value: string;
};

export type CreateFormField = Omit<
  FormField,
  'id' | 'createdAt' | 'updatedAt' | 'options'
> & { options: FormFieldOption[] };

type CreateEmptyFormFieldProps = {
  fieldVariant: FieldVariant;
  fieldOrder: number;
  formId: string;
};

export const createEmptyFormField = ({
  fieldVariant,
  fieldOrder,
  formId,
}: CreateEmptyFormFieldProps): CreateFormField => {
  const label = fieldVariant.charAt(0).toUpperCase() + fieldVariant.slice(1);

  return {
    fieldVariant,
    label,
    placeholder: '',
    helpText: '',
    isRequired: false,
    fieldOrder,
    defaultValue: '',
    validationRules: null,
    formId,
    options: [],
  };
};
