"use client";

import { ReactElement, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useCreateBookingForm } from "./use-create-booking-form";
import { fieldTypes, FormSchemaType } from "../booking-form.helper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";

import {
  Plus,
  Trash2,
  MoveVertical,
  Eye,
  EyeOff,
  Save,
  Settings,
  FormInput,
} from "lucide-react";

// Field type for drag and drop
const FIELD_TYPE = "form-field";

// Draggable field component for the sidebar
const DraggableField = ({ type, label }: { type: string; label: string }) => {
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
      className={`p-3 mb-2 border rounded cursor-move flex items-center ${
        isDragging ? "opacity-50 border-blue-500" : "border-gray-200"
      }`}
    >
      <FormInput className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};

// Draggable field in the form preview
const DraggableFormField = ({
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

  return (
    <div
      ref={fieldRef}
      className={`p-4 mb-3 border rounded ${
        isDragging ? "opacity-50 border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <MoveVertical className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium">{field.label}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(index)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

// Form field preview component
const FormFieldPreview = ({ field }: { field: any }) => {
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
          <Select disabled>
            <SelectTrigger>
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
    // Add other field types as needed
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
          <Input placeholder={field.placeholder} disabled />
        </div>
      );
  }
};

// Form drop area
const FormDropArea = ({
  fields,
  onAddField,
  onUpdateField,
  onRemoveField,
  onReorderFields,
}: {
  fields: any[];
  onAddField: (type: string) => void;
  onUpdateField: (index: number, field: any) => void;
  onRemoveField: (index: number) => void;
  onReorderFields: (startIndex: number, endIndex: number) => void;
}) => {
  // Create a ref object
  const dropRef = useRef<HTMLDivElement>(null);

  // Use the useDrop hook and connect it to the ref
  const [, drop] = useDrop(() => ({
    accept: FIELD_TYPE,
    drop: (item: any) => {
      if (item.type) {
        // This is a new field from the sidebar
        onAddField(item.type);
      }
    },
  }));

  // Connect the drop ref to our element
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`p-4 border-2 border-dashed rounded-lg min-h-[300px] ${
        fields.length === 0 ? "flex items-center justify-center" : ""
      }`}
    >
      {fields.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Drag and drop form fields here</p>
          <p className="text-sm">or click on a field type in the sidebar</p>
        </div>
      ) : (
        fields.map((field, index) => (
          <DraggableFormField
            key={index}
            index={index}
            field={field}
            onUpdate={onUpdateField}
            onRemove={onRemoveField}
            onReorder={onReorderFields}
          />
        ))
      )}
    </div>
  );
};

// Form preview
const FormPreview = ({
  formData,
  fields,
}: {
  formData: any;
  fields: any[];
}) => {
  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{formData.name}</h2>
      {formData.description && (
        <p className="text-gray-600 mb-6">{formData.description}</p>
      )}

      {fields.map((field, index) => (
        <FormFieldPreview key={index} field={field} />
      ))}

      <Button className="mt-4" disabled>
        Submit
      </Button>
    </div>
  );
};

// Form settings
const FormSettings = ({
  formData,
  onUpdate,
}: {
  formData: any;
  onUpdate: (key: keyof FormSchemaType, value: any) => void;
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="form-name">Form Name</Label>
        <Input
          id="form-name"
          value={formData.name}
          onChange={(e) => onUpdate("name", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="form-description">Description</Label>
        <Textarea
          id="form-description"
          value={formData.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="confirmation-message">Confirmation Message</Label>
        <Textarea
          id="confirmation-message"
          value={formData.confirmationMessage || ""}
          onChange={(e) => onUpdate("confirmationMessage", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
        <Input
          id="redirect-url"
          value={formData.redirectUrl || ""}
          onChange={(e) => onUpdate("redirectUrl", e.target.value)}
          placeholder="https://example.com/thank-you"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="allow-cancellation"
          checked={formData.allowCancellation}
          onCheckedChange={(checked) => onUpdate("allowCancellation", checked)}
        />
        <Label htmlFor="allow-cancellation">
          Allow Appointment Cancellation
        </Label>
      </div>

      {formData.allowCancellation && (
        <div>
          <Label htmlFor="cancellation-notice">
            Cancellation Notice (Hours)
          </Label>
          <Input
            id="cancellation-notice"
            type="number"
            min="0"
            value={formData.cancellationNoticeHours}
            onChange={(e) =>
              onUpdate("cancellationNoticeHours", parseInt(e.target.value))
            }
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="is-active"
          checked={formData.isActive}
          onCheckedChange={(checked) => onUpdate("isActive", checked)}
        />
        <Label htmlFor="is-active">Form Active</Label>
      </div>
    </div>
  );
};

export const FormBuilder = (): ReactElement => {
  const {
    formData,
    formFields,
    isPreviewMode,
    isSaving,
    togglePreview,
    updateFormData,
    addField,
    updateField,
    removeField,
    reorderFields,
    saveForm,
  } = useCreateBookingForm();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {formData.name ? "Edit Form" : "Create Form"}
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={togglePreview}>
              {isPreviewMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            <Button onClick={saveForm} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Form"}
            </Button>
          </div>
        </div>

        {isPreviewMode ? (
          <FormPreview formData={formData} fields={formFields} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {fieldTypes.map((fieldType) => (
                      <DraggableField
                        key={fieldType.id}
                        type={fieldType.id}
                        label={fieldType.label}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="builder">
                <TabsList>
                  <TabsTrigger value="builder">
                    <FormInput className="h-4 w-4 mr-2" />
                    Form Builder
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Form Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="builder">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Layout</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormDropArea
                        fields={formFields}
                        onAddField={addField}
                        onUpdateField={updateField}
                        onRemoveField={removeField}
                        onReorderFields={reorderFields}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormSettings
                        formData={formData}
                        onUpdate={updateFormData}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};
