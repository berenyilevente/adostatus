import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FIELD_TYPE, fieldTypes } from "../../booking-form.helper";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Switch,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components";
import { MoveVertical, Plus, Trash2 } from "lucide-react";
import { FormFieldDetails } from "./FormFieldDetails";

export const DroppedFormField = ({
  index,
  field,
  onUpdate,
  onRemove,
  onReorder,
}: {
  index: number;
  field: any;
  onUpdate: (index: number, field: any) => void;
  onRemove: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: FIELD_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: FIELD_TYPE,
    hover(item: any) {
      if (item.index === undefined) {
        // This is a new field from the sidebar
        return;
      }

      if (item.index !== index) {
        onReorder(item.index, index);
        item.index = index;
      }
    },
  }));

  // Create a ref for the element
  const fieldRef = useRef<HTMLDivElement>(null);

  // Connect both drag and drop to the ref
  drag(drop(fieldRef));
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2">
      <div
        ref={fieldRef}
        className={`p-2 border rounded-lg w-full mb-2 ${
          isDragging ? "opacity-50 border-blue-500" : "border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MoveVertical className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">
              {fieldTypes.find((type) => type.id === field.fieldType)?.label}
            </span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              startIcon="pencil"
              onClick={() => setOpen(true)}
            />
            <Button
              variant="ghost"
              size="icon"
              startIcon="trash"
              onClick={() => onRemove(index)}
            />
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Field</DialogTitle>
            </DialogHeader>
            <FormFieldDetails index={index} field={field} onUpdate={onUpdate} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {fieldTypes.map((type) => (
            <DropdownMenuItem
              key={type.id}
              onClick={() => {
                setOpen(false);
                console.log(type.id);
              }}
              className="cursor-pointer"
            >
              {type.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
