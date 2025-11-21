'use client';

import { useRouter } from 'next/navigation';
import React, { ReactElement } from 'react';
import { Button } from '@/components';

import { FormBuilder } from './components/FormBuilder';
import { PreviewDialogButton } from './components/PreviewDialogButton';
import { DesignerContextProvider } from './components/context/DesignerContext';
import { SaveFormButton } from './components/SaveFormButton';
import { PublishButton } from './components/PublishButton';

export const EditBookingForm = (): ReactElement => {
  const router = useRouter();

  return (
    <DesignerContextProvider>
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
          <PreviewDialogButton />
          <SaveFormButton />
          <PublishButton />
        </div>
      </div>
      <FormBuilder />
    </DesignerContextProvider>
  );
};
