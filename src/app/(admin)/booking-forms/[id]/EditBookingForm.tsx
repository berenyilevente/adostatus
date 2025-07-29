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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  FormWrapper,
} from '@/components';
import { useEditBookingForm } from './use-edit-booking-form';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';

export const EditBookingForm = (): ReactElement => {
  const router = useRouter();
  const {
    editorFields,
    addFieldToRow,
    addRowWithField,
    selectField,
    removeField,
    modalOpen,
    closeModal,
    availableFields,
    previewForm,
    renderPreviewField,
    modalForm,
    handleSaveModal,
    handleModalChange,
    setModalForm,
    onSubmit,
  } = useEditBookingForm();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/booking-forms')}
            className="flex items-center space-x-2"
            startIcon="arrowLeft"
          >
            <span>Back to Booking Forms</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={onSubmit} className="w-full" size="sm" type="button">
            Save Changes
          </Button>
        </div>
      </div>
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
                      className="w-full flex items-center justify-between rounded-xl border px-4 shadow-sm bg-white min-w-[200px]"
                      onClick={() => selectField(field.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="flex-1 text-sm font-normal">
                        {field.label}
                      </div>
                      <div className="flex items-center">
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
            <FormWrapper
              form={previewForm}
              className="flex w-full flex-col gap-4"
            >
              {editorFields.length > 0 ? (
                <>
                  {editorFields.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex gap-4 w-full items-center flex-row"
                    >
                      {row.map((field) => renderPreviewField(field))}
                    </div>
                  ))}
                  <Button type="submit" variant="default" className="mt-4">
                    Submit
                  </Button>
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-sm text-gray-500">No fields added yet.</p>
                </div>
              )}
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
      </div>
    </div>
  );
};
