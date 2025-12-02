'use client';

import { Label, Textarea } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

const type: ElementsType = 'ParagraphField';

const extraAttributes = {
  paragraph: 'Paragraph Field',
};

const propertiesSchema = z.object({
  paragraph: z.string().min(1).max(500),
});

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButtonElement: {
    icon: 'paragraph',
    label: 'Paragraph Field',
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
        {element.extraAttributes.paragraph}
      </Label>
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
      paragraph: element.extraAttributes.paragraph,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    const { paragraph } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: { paragraph },
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
          name="paragraph"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Paragraph to display additional information
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const FormComponent = memo(
  ({ elementInstance }: { elementInstance: FormElementInstance }) => {
    const element = elementInstance as CustomInstance;
    return (
      <div className="text-sm text-muted-foreground">
        {element.extraAttributes.paragraph}
      </div>
    );
  }
);
