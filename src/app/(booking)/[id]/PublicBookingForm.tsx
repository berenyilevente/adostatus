'use client';

import { Button, FormWrapper } from '@/components';
import { useBooking } from './use-booking';
import {
  ElementsType,
  FormElements,
} from '@/app/(admin)/booking-forms/[id]/edit-form.helper';

export const PublicBookingForm = () => {
  const { formFields, onSubmit, form, transition } = useBooking();

  if (!formFields?.length) {
    return <div>No form fields found</div>;
  }

  return (
    <FormWrapper form={form} className="space-y-4">
      <div>
        {formFields.map((element) => {
          const ElementType: ElementsType = element.type;
          const FormComponent = FormElements[ElementType].formComponent;
          return (
            <FormComponent
              key={element.id}
              elementInstance={element}
              control={form.control}
            />
          );
        })}
        <Button type="submit" onClick={onSubmit} isLoading={transition}>
          Submit
        </Button>
      </div>
    </FormWrapper>
  );
};
