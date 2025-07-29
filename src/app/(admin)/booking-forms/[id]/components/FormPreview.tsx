'use client';

import React from 'react';
import { Button, FormWrapper } from '@/components';
import { useEditBookingForm } from '../use-edit-booking-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';

export const FormPreview = () => {
  const { editorFields, previewForm, renderPreviewField } =
    useEditBookingForm();

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <FormWrapper form={previewForm} className="flex w-full flex-col gap-4">
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
  );
};
