'use client';

import { useRouter } from 'next/navigation';
import React, { ReactElement } from 'react';
import { Button } from '@/components';
import { useEditBookingForm } from './use-edit-booking-form';

import { FormElementList } from './components/FormElementList';
import { FormEditor } from './components/FormEditor';
import { FormPreview } from './components/FormPreview';
import { FormElementDialog } from './components/FormElementDialog';

export const EditBookingForm = (): ReactElement => {
  const router = useRouter();
  const { onSubmit } = useEditBookingForm();

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
        <FormElementList />
        <FormEditor />
        <FormPreview />
        <FormElementDialog />
      </div>
    </div>
  );
};
