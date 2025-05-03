import { useRef } from "react";
import { useDrop } from "react-dnd";

import { FIELD_TYPE } from "../../booking-form.helper";
import { FormFieldDropped } from "./FormFieldDropped";
import { useCreateBookingForm } from "../use-create-booking-form";

export const FormDropArea = () => {
  const { formFields, addField } = useCreateBookingForm();
  // Create a ref object
  const dropRef = useRef<HTMLDivElement>(null);

  // Use the useDrop hook and connect it to the ref
  const [, drop] = useDrop(() => ({
    accept: FIELD_TYPE,
    drop: (item: any) => {
      if (item.type) {
        addField(item.type);
      }
    },
  }));

  // Connect the drop ref to our element
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`p-4 border-2 border-dashed rounded-lg min-h-[300px] ${
        formFields.length === 0 ? "flex items-center justify-center" : ""
      }`}
    >
      {formFields.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Drag and drop form fields here</p>
          <p className="text-sm">or click on a field type in the sidebar</p>
        </div>
      ) : (
        formFields.map((field, index) => (
          <FormFieldDropped key={index} index={index} field={field} />
        ))
      )}
    </div>
  );
};
