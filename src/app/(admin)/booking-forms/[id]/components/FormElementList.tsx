'use client';

import React, { ReactElement } from 'react';

import { useEditBookingForm } from '../use-edit-booking-form';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';

export const FormElementList = (): ReactElement => {
  const { addField, availableFields } = useEditBookingForm();

  return (
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
              onClick={() => addField(field.key)}
            >
              {field.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
