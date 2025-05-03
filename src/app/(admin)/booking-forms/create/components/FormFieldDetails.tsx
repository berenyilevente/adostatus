import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FIELD_TYPE } from "../../booking-form.helper";
import { Button, Input, Label, Switch } from "@/components";
import { MoveVertical, Plus, Trash2 } from "lucide-react";

export const FormFieldDetails = ({
  index,
  field,
  onUpdate,
}: {
  index: number;
  field: any;
  onUpdate: (index: number, field: any) => void;
}) => {
  return (
    <div className="p-4 mb-3 border rounded">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor={`field-${index}-label`}>Label</Label>
          <Input
            id={`field-${index}-label`}
            value={field.label}
            onChange={(e) => onUpdate(index, { label: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor={`field-${index}-placeholder`}>Placeholder</Label>
          <Input
            id={`field-${index}-placeholder`}
            value={field.placeholder || ""}
            onChange={(e) => onUpdate(index, { placeholder: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor={`field-${index}-helpText`}>Help Text</Label>
          <Input
            id={`field-${index}-helpText`}
            value={field.helpText || ""}
            onChange={(e) => onUpdate(index, { helpText: e.target.value })}
          />
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id={`field-${index}-required`}
            checked={field.isRequired}
            onCheckedChange={(checked) =>
              onUpdate(index, { isRequired: checked })
            }
          />
          <Label htmlFor={`field-${index}-required`}>Required</Label>
        </div>

        {(field.fieldType === "select" ||
          field.fieldType === "radio" ||
          field.fieldType === "checkbox") && (
          <div className="col-span-2">
            <Label className="mb-2 block">Options</Label>
            {field.options?.map((option: any, optionIndex: number) => (
              <div key={optionIndex} className="flex mb-2">
                <Input
                  value={option.label}
                  onChange={(e) => {
                    const newOptions = [...field.options];
                    newOptions[optionIndex] = {
                      ...newOptions[optionIndex],
                      label: e.target.value,
                      value: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                    };
                    onUpdate(index, { options: newOptions });
                  }}
                  className="mr-2"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newOptions = [...field.options];
                    newOptions.splice(optionIndex, 1);
                    onUpdate(index, { options: newOptions });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newOptions = [...(field.options || [])];
                newOptions.push({
                  label: `Option ${newOptions.length + 1}`,
                  value: `option${newOptions.length + 1}`,
                });
                onUpdate(index, { options: newOptions });
              }}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Option
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
