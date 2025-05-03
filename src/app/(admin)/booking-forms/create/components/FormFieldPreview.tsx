import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import {
  Textarea,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";

export const FormFieldPreview = ({ field }: { field: any }) => {
  const [date, setDate] = useState<Date | undefined>();

  switch (field.fieldType) {
    case "text":
      return (
        <div className="mb-4">
          <Label htmlFor={`preview-${field.id}`}>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Input
            id={`preview-${field.id}`}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue || ""}
          />
        </div>
      );

    case "email":
      return (
        <div className="mb-4">
          <Label htmlFor={`preview-${field.id}`}>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Input
            id={`preview-${field.id}`}
            type="email"
            placeholder={field.placeholder}
            defaultValue={field.defaultValue || ""}
          />
        </div>
      );

    case "phone":
      return (
        <div className="mb-4">
          <Label htmlFor={`preview-${field.id}`}>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Input
            id={`preview-${field.id}`}
            type="tel"
            placeholder={field.placeholder}
            defaultValue={field.defaultValue || ""}
          />
        </div>
      );

    case "textarea":
      return (
        <div className="mb-4">
          <Label htmlFor={`preview-${field.id}`}>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Textarea
            id={`preview-${field.id}`}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue || ""}
          />
        </div>
      );

    case "select":
      return (
        <div className="mb-4">
          <Label htmlFor={`preview-${field.id}`}>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Select>
            <SelectTrigger id={`preview-${field.id}`}>
              <SelectValue
                placeholder={field.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any, i: number) => (
                <SelectItem key={i} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "radio":
      return (
        <div className="mb-4">
          <Label>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <RadioGroup defaultValue={field.defaultValue || ""}>
            {field.options?.map((option: any, i: number) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`preview-${field.id}-${i}`}
                />
                <Label htmlFor={`preview-${field.id}-${i}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-4">
          <Label>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <div className="space-y-2 mt-2">
            {field.options?.map((option: any, i: number) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox id={`preview-${field.id}-${i}`} />
                <Label htmlFor={`preview-${field.id}-${i}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      );

    case "date":
      return (
        <div className="mb-4">
          <Label>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date
                  ? format(date, "PPP")
                  : field.placeholder || "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      );

    case "time":
      return (
        <div className="mb-4">
          <Label>{field.label}</Label>
          <Input type="time" />
        </div>
      );

    case "number":
      return (
        <div className="mb-4">
          <Label htmlFor={`preview-${field.id}`}>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Input
            id={`preview-${field.id}`}
            type="number"
            placeholder={field.placeholder}
            defaultValue={field.defaultValue || ""}
          />
        </div>
      );

    default:
      return (
        <div className="mb-4">
          <Label>
            {field.label}{" "}
            {field.isRequired && <span className="text-red-500">*</span>}
          </Label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          <Input placeholder={field.placeholder} />
        </div>
      );
  }
};
