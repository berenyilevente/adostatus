'use client';

import {
  FormElementInstance,
  FormElements,
} from '@/app/(admin)/booking-forms/[id]/components/FormElements';
import { Button, Form } from '@/components';
import { useForm } from 'react-hook-form';

export const PublicBookingForm = ({
  formFields,
}: {
  formFields: FormElementInstance[];
}) => {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      {formFields.map((element) => {
        const FormComponent = FormElements[element.type].formComponent;
        return <FormComponent key={element.id} elementInstance={element} />;
      })}
      <Button type="submit">Submit</Button>
    </Form>
  );
};
