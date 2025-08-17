'use client';

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
} from '@/components';
import { useEditFieldProperties } from '../contexts/use-edit-field-properties';

export const EditFieldPropertiesDialog = () => {
  const {
    modalOpen,
    closeModal,
    fieldToEdit,
    handleSaveModal,
    handleEditFieldOnChange,
    setFieldToEdit,
  } = useEditFieldProperties();

  return (
    <Dialog open={modalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Field</DialogTitle>
          <DialogDescription>
            Edit the properties of your field below.
          </DialogDescription>
        </DialogHeader>
        {fieldToEdit && (
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
                value={fieldToEdit.label || ''}
                onChange={handleEditFieldOnChange}
              />
            </div>
            <div>
              <Label htmlFor="helpText">Description</Label>
              <Textarea
                name="helpText"
                value={fieldToEdit.helpText || ''}
                onChange={handleEditFieldOnChange}
              />
            </div>
            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                name="placeholder"
                value={fieldToEdit.placeholder || ''}
                onChange={handleEditFieldOnChange}
              />
            </div>
            {/* Options editor for select/combobox */}
            {(fieldToEdit.fieldType === 'select' ||
              fieldToEdit.fieldType === 'combobox') && (
              <div className="flex flex-col gap-2">
                <Label>Options</Label>
                {(fieldToEdit.options || []).map((opt: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      placeholder="Label"
                      value={opt.label}
                      onChange={(e) => {
                        const newOptions = [...(fieldToEdit.options || [])];
                        newOptions[idx] = {
                          ...newOptions[idx],
                          label: e.target.value,
                        };
                        setFieldToEdit((prev: any) => ({
                          ...prev,
                          options: newOptions,
                        }));
                      }}
                      className="w-1/2"
                    />
                    <Input
                      placeholder="Value"
                      value={opt.value}
                      onChange={(e) => {
                        const newOptions = [...(fieldToEdit.options || [])];
                        newOptions[idx] = {
                          ...newOptions[idx],
                          value: e.target.value,
                        };
                        setFieldToEdit((prev: any) => ({
                          ...prev,
                          options: newOptions,
                        }));
                      }}
                      className="w-1/2"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newOptions = [...(fieldToEdit.options || [])];
                        newOptions.splice(idx, 1);
                        setFieldToEdit((prev: any) => ({
                          ...prev,
                          options: newOptions,
                        }));
                      }}
                    >
                      <Icon icon="trash" size="sm" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFieldToEdit((prev: any) => ({
                      ...prev,
                      options: [
                        ...(prev.options || []),
                        { label: '', value: '' },
                      ],
                    }));
                  }}
                >
                  Add Option
                </Button>
              </div>
            )}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  name="isRequired"
                  checked={!!fieldToEdit.isRequired}
                  onCheckedChange={(checked) =>
                    setFieldToEdit((prev: any) => ({
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
                  onCheckedChange={(checked) =>
                    setFieldToEdit((prev: any) => ({
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
  );
};
