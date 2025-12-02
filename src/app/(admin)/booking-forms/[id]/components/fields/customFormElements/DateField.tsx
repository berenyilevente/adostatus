'use client';

import {
  FormDatepicker,
  FormInput,
  FormSwitch,
  Input,
  Label,
  Switch,
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
import { getName } from '../fields.helper';

const type: ElementsType = 'DateField';

const extraAttributes = {
  label: 'Date Field',
  helpText: '',
  required: false,
  name: 'date_field',
};

const propertiesSchema = z.object({
  label: z.string().min(1),
  helpText: z.string(),
  required: z.boolean(),
  name: z.string(),
});

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButtonElement: {
    icon: 'calendar',
    label: 'Date Field',
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
    <div className="rounded-md p-2 w-full">
      <Label className="text-sm font-medium text-gray-500">
        {element.extraAttributes.label}
        {element.extraAttributes.required && (
          <span className="text-red-500 pl-1">*</span>
        )}
      </Label>
      <Input placeholder={element.extraAttributes.placeholder} readOnly />
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
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
    form.setValue('name', getName(element.extraAttributes.label));
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    const { label, helpText, required, name } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helpText, required, name },
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
      <FormDatepicker
        control={control}
        name={element.extraAttributes.name}
        label={element.extraAttributes.label}
        description={element.extraAttributes.helpText}
      />
    );
  }
);
