'use client';

import React, { ReactElement, useState, useEffect } from 'react';
import {
  Button,
  Icon,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Textarea,
  Checkbox,
  Label,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components';
import { useCreateBookingForm } from './use-create-booking-form';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';
import { useForm } from 'react-hook-form';
import {
  FormInput,
  FormCheckbox,
  FormCombobox,
  FormSelect,
  FormDatepicker,
  FormRadioGroup,
  FormTextarea,
  FormSwitch,
  FormMultiselect,
  FormColorPicker,
  FormTagInput,
  FormTimepicker,
  FormWrapper,
} from '@/components';

export const FormBuilder = (): ReactElement => {
  const {
    editorFields,
    addFieldToRow,
    addRowWithField,
    selectField,
    editField,
    removeField,
    selectedField,
    selectedFieldId,
    modalOpen,
    closeModal,
    availableFields,
  } = useCreateBookingForm();

  // Local state for modal form
  const [modalForm, setModalForm] = useState<any>(null);

  // Preview form state
  const previewForm = useForm({
    mode: 'onChange',
    defaultValues: React.useMemo(() => {
      const values: Record<string, any> = {};
      editorFields.flat().forEach((field) => {
        values[field.id] = field.defaultValue || '';
      });
      return values;
    }, [editorFields]),
  });

  // Open modal with selected field's data
  useEffect(() => {
    if (selectedField) {
      setModalForm({ ...selectedField });
    }
  }, [selectedField, modalOpen]);

  // Handle modal form changes
  const handleModalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModalForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save modal changes
  const handleSaveModal = () => {
    if (selectedFieldId && modalForm) {
      editField(selectedFieldId, modalForm);
      closeModal();
    }
  };

  // Map fieldType to component
  const renderPreviewField = (field: any) => {
    const commonProps = {
      control: previewForm.control,
      name: field.id,
      label: field.label,
      description: field.helpText,
      placeholder: field.placeholder,
      options: field.options || [],
      className: 'w-full',
    };
    switch (field.fieldType) {
      case 'text-input':
        return <FormInput {...commonProps} key={field.id} />;
      case 'checkbox':
        return <FormCheckbox {...commonProps} key={field.id} />;
      case 'combobox':
        return <FormCombobox {...commonProps} key={field.id} />;
      case 'select':
        return <FormSelect {...commonProps} key={field.id} />;
      case 'datepicker':
        return <FormDatepicker {...commonProps} key={field.id} />;
      case 'radio-group':
        return (
          <FormRadioGroup
            control={previewForm.control}
            name={field.id}
            items={field.options || []}
            label={field.label}
            description={field.helpText}
            key={field.id}
            value={field.defaultValue}
          />
        );
      case 'textarea':
        return <FormTextarea {...commonProps} key={field.id} />;
      case 'switch':
        return <FormSwitch {...commonProps} key={field.id} />;
      case 'multiselect':
        return <FormMultiselect {...commonProps} key={field.id} />;
      case 'color-picker':
        return <FormColorPicker {...commonProps} key={field.id} />;
      case 'tag-input':
        return <FormTagInput {...commonProps} key={field.id} />;
      case 'timepicker':
        return <FormTimepicker {...commonProps} key={field.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Choose element</CardTitle>
          <CardDescription>
            Click on an element to add it to the editor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableFields.map((field) => (
              <Badge
                className="cursor-pointer text-sm font-normal"
                variant="outline"
                key={field.key}
                onClick={() => addRowWithField(field.key)}
              >
                {field.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Editor</CardTitle>
          <CardDescription>
            Edit or rearrange the form elements here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 overflow-x-auto">
            {editorFields.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2 items-stretch">
                {row.map((field) => (
                  <div
                    key={field.id}
                    className="w-full flex items-center justify-between rounded-xl border px-3 py-2 shadow-sm bg-white min-w-[200px]"
                    onClick={() => selectField(field.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex-1 text-base font-normal">
                      {field.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectField(field.id);
                        }}
                        endIcon="pencil"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeField(field.id);
                        }}
                        endIcon="trash"
                      />
                    </div>
                  </div>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      endIcon="plus"
                      className="w-5 h-5"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Select Component</DropdownMenuLabel>
                    {availableFields.map((field) => (
                      <DropdownMenuItem
                        key={field.key}
                        onClick={() => addFieldToRow(rowIdx, field.key)}
                      >
                        {field.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <FormWrapper form={previewForm} className="flex flex-col gap-4">
            <>
              {editorFields.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex gap-4 w-full items-center flex-row"
                >
                  {row.map((field) => renderPreviewField(field))}
                </div>
              ))}
            </>
            <Button type="submit" variant="default" className="mt-4">
              Submit
            </Button>
          </FormWrapper>
        </CardContent>
      </Card>
      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
            <DialogDescription>
              Edit the properties of your field below.
            </DialogDescription>
          </DialogHeader>
          {modalForm && (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveModal();
              }}
            >
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  name="label"
                  value={modalForm.label || ''}
                  onChange={handleModalChange}
                />
              </div>
              <div>
                <Label htmlFor="helpText">Description</Label>
                <Textarea
                  name="helpText"
                  value={modalForm.helpText || ''}
                  onChange={handleModalChange}
                />
              </div>
              <div>
                <Label htmlFor="placeholder">Placeholder</Label>
                <Input
                  name="placeholder"
                  value={modalForm.placeholder || ''}
                  onChange={handleModalChange}
                />
              </div>
              <div>
                <Label htmlFor="className">className</Label>
                <Input
                  name="className"
                  value={modalForm.className || ''}
                  onChange={handleModalChange}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  value={modalForm.name || ''}
                  onChange={handleModalChange}
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <Checkbox
                    name="isRequired"
                    checked={!!modalForm.isRequired}
                    onCheckedChange={(checked) =>
                      setModalForm((prev: any) => ({
                        ...prev,
                        isRequired: !!checked,
                      }))
                    }
                  />
                  Required
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    name="disabled"
                    checked={!!modalForm.disabled}
                    onCheckedChange={(checked) =>
                      setModalForm((prev: any) => ({
                        ...prev,
                        disabled: !!checked,
                      }))
                    }
                  />
                  Disabled
                </label>
              </div>
              <DialogFooter>
                <Button type="submit" variant="default">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
