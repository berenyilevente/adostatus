import { Button } from "@/components/ui/button";
import { FormFieldPreview } from "./FormFieldPreview";
import { Card, CardTitle } from "@/components";

export const FormPreview = ({
  formData,
  fields,
}: {
  formData: any;
  fields: any[];
}) => {
  return (
    <Card className="p-6 border rounded-lg">
      <CardTitle>{formData.name}</CardTitle>
      {formData.description && (
        <p className="text-gray-600 mb-6">{formData.description}</p>
      )}

      {fields.map((field, index) => (
        <FormFieldPreview key={index} field={field} />
      ))}

      <Button className="mt-4">Submit</Button>
    </Card>
  );
};
