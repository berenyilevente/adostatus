'use client';

import {
  FormDatepicker,
  FormInput,
  Icon,
  Input,
  Label,
  Switch,
} from '@/components';
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '../FormElements';
import { z } from 'zod';
import { Control, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect, useState } from 'react';
import { useDesignerContext } from '../context/DesignerContext';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const type: ElementsType = 'DateField';

const extraAttributes = {
  label: 'Date Field',
  helpText: 'Pick a date',
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(1),
  helpText: z.string().min(1),
  required: z.boolean(),
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
  const { updateElement } = useDesignerContext();
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
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    const { label, helpText, required } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helpText, required },
    });
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Label to display above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helpText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Help Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Help text to display below the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex rounded-lg border p-3 shadow-sm items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>Set if the field is required</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
        name={element.id}
        label={element.extraAttributes.label}
        description={element.extraAttributes.helpText}
      />
    );
  }
);
