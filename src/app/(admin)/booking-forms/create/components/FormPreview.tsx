import { Card, CardTitle, Button } from "@/components";

import { FormFieldPreview } from "./FormFieldPreview";
import { useCreateBookingForm } from "../use-create-booking-form";

export const FormPreview = () => {
  const { formData, formFields } = useCreateBookingForm();

  return (
    <Card className="p-6 border rounded-lg">
      <CardTitle>{formData.name}</CardTitle>
      {formData.description && (
        <p className="text-gray-600 mb-6">{formData.description}</p>
      )}
      <div className="mt-4">
        {formFields.map((field, index) => (
          <FormFieldPreview key={index} field={field} />
        ))}
      </div>

      <Button className="mt-4">Submit</Button>
    </Card>
  );
};
