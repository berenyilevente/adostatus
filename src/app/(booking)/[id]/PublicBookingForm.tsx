'use client';

import { FormElements } from '@/app/(admin)/booking-forms/[id]/components/FormElements';
import { Button, FormWrapper } from '@/components';
import { useBooking } from './use-booking';

export const PublicBookingForm = () => {
  const { formFields, onSubmit, form, transition } = useBooking();

  return (
    <FormWrapper form={form} className="space-y-4">
      <div>
        {formFields.map((element) => {
          const FormComponent = FormElements[element.type].formComponent;
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
