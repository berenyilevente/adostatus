'use client';

import {
  FormInput,
  FormSlider,
  FormSwitch,
  FormTextarea,
  Input,
  Label,
  Switch,
  Textarea,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEditBookingForm } from '../../../use-edit-booking-form';
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '../../../edit-form.helper';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { getName } from '../fields.helper';

const type: ElementsType = 'TextAreaField';

const extraAttributes = {
  label: 'Text Area Field',
  helpText: '',
  required: false,
  placeholder: '',
  rows: 3,
  name: 'text_area_field',
};

const propertiesSchema = z.object({
  label: z.string().min(1),
  helpText: z.string(),
  required: z.boolean(),
  placeholder: z.string(),
  rows: z.number().min(1).max(10),
  name: z.string(),
});

export const TextAreaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButtonElement: {
    icon: 'textarea',
    label: 'Text Area Field',
  },
  designerComponent: (props) => <DesignerComponent {...props} />,
  formComponent: (props) => <FormComponent {...props} />,
  propertiesComponent: (props) => <PropertiesComponent {...props} />,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  return (
    <div className="p-1 w-full">
      <Label className="text-sm font-medium text-gray-500">
        {element.extraAttributes.label}
        {element.extraAttributes.required && (
          <span className="text-red-500 pl-1">*</span>
        )}
      </Label>
      <Textarea placeholder={element.extraAttributes.placeholder} readOnly />
      <p className="text-xs text-muted-foreground">
        {element.extraAttributes.helpText}
      </p>
    </div>
  );
};

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const { updateElement } = useEditBookingForm();
  const element = elementInstance as CustomInstance;
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
      helpText: element.extraAttributes.helpText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
      rows: element.extraAttributes.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
    form.setValue('name', getName(element.extraAttributes.label));
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    const { label, helpText, required, placeholder, rows, name } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helpText, required, placeholder, rows, name },
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormInput
          control={form.control}
          name="label"
          label="Label"
          description="Label to display above the field"
          onChange={(e) => {
            form.setValue('label', e.target.value);
            form.setValue('name', getName(e.target.value));
          }}
          onKeyDown={onKeyDown}
        />
        <FormInput
          control={form.control}
          name="placeholder"
          label="Placeholder"
          description="Placeholder text to display in the field"
          onKeyDown={onKeyDown}
        />
        <FormInput
          control={form.control}
          name="helpText"
          description="Help text to display below the field"
          onKeyDown={onKeyDown}
        />
        <FormSwitch
          control={form.control}
          name="required"
          label="Required"
          description="Set if the field is required"
        />
        <FormSlider
          control={form.control}
          name="rows"
          label={`Rows: ${form.watch('rows')}`}
          description="Number of rows to display in the field"
          min={1}
          max={10}
          step={1}
        />
      </form>
    </Form>
  );
};

const FormComponent = memo(
  ({
    elementInstance,
    control,
  }: {
    elementInstance: FormElementInstance;
    control: Control<any>;
  }) => {
    const element = elementInstance as CustomInstance;
    return (
      <FormTextarea
        control={control}
        name={element.extraAttributes.name}
        placeholder={element.extraAttributes.placeholder}
        label={element.extraAttributes.label}
        description={element.extraAttributes.helpText}
        rows={element.extraAttributes.rows}
      />
    );
  }
);
