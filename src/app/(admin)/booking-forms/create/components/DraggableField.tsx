import { useRef } from "react";
import { FIELD_TYPE } from "../../booking-form.helper";
import { useDrag } from "react-dnd";
import { FormInput } from "lucide-react";

export const DraggableField = ({
  type,
  label,
}: {
  type: string;
  label: string;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: FIELD_TYPE,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Create a ref for the element
  const dragRef = useRef<HTMLDivElement>(null);

  // Connect drag to the ref
  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className={`p-3 mb-2 border rounded-lg cursor-move flex items-center ${
        isDragging ? "opacity-50 border-blue-500" : "border-gray-200"
      }`}
    >
      <FormInput className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
