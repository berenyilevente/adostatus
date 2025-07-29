'use client';

import { useRouter } from 'next/navigation';
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
} from '@/components';
import { useEditBookingForm } from '../use-edit-booking-form';

export const FormElementDialog = () => {
  const {
    modalOpen,
    closeModal,
    modalForm,
    handleSaveModal,
    handleModalChange,
    setModalForm,
  } = useEditBookingForm();

  return (
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
            {/* Options editor for select/combobox */}
            {(modalForm.fieldType === 'select' ||
              modalForm.fieldType === 'combobox') && (
              <div className="flex flex-col gap-2">
                <Label>Options</Label>
                {(modalForm.options || []).map((opt: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      placeholder="Label"
                      value={opt.label}
                      onChange={(e) => {
                        const newOptions = [...(modalForm.options || [])];
                        newOptions[idx] = {
                          ...newOptions[idx],
                          label: e.target.value,
                        };
                        setModalForm((prev: any) => ({
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
                        const newOptions = [...(modalForm.options || [])];
                        newOptions[idx] = {
                          ...newOptions[idx],
                          value: e.target.value,
                        };
                        setModalForm((prev: any) => ({
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
                        const newOptions = [...(modalForm.options || [])];
                        newOptions.splice(idx, 1);
                        setModalForm((prev: any) => ({
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
                    setModalForm((prev: any) => ({
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
  );
};
