'use client';

import React from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components';
import { useEditBookingForm } from '../use-edit-booking-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';
import { useEditFieldProperties } from '../contexts/use-edit-field-properties';
import { fields as availableFields } from '../../booking-form.helper';

export const FormEditor = () => {
  const { editorFields, addFieldToRow, removeField } = useEditBookingForm();

  const { selectField } = useEditFieldProperties();

  return (
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
              {row.map((field, index) => (
                <div
                  key={`${field.label}${index}`}
                  className="w-full flex items-center justify-between rounded-xl border px-4 shadow-sm bg-white min-w-[200px]"
                  onClick={() => selectField(field.tempId)}
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
                        selectField(field.tempId);
                      }}
                      endIcon="pencil"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeField(field.tempId);
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
  );
};
