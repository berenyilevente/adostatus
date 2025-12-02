'use client';

import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

import { FormStatus } from '@/generated/prisma';
import { cn } from '@/utils';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect } from 'react';
import { DesignerDropArea } from './components/DesignerDropArea';
import { DragOverlayWrapper } from './components/DragOverlayWrapper';
import { PreviewFormButton } from './components/PreviewDialogButton';
import { PublishFormButton } from './components/PublishFormButton';
import { SaveFormButton } from './components/SaveFormButton';
import { useEditBookingForm } from './use-edit-booking-form';
import { DesignerSidebar } from './components/sidebar/DesignerSidebar';

export const EditBookingForm = (): ReactElement => {
  const router = useRouter();
  const { formData, setElements } = useEditBookingForm();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (!formData?.content) {
      return;
    }

    const elements = JSON.parse(formData?.content);
    setElements(elements);
  }, [formData?.content, setElements]);

  return (
    <>
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
          <PreviewFormButton />
          <SaveFormButton />
          <PublishFormButton />
        </div>
      </div>
      <DndContext sensors={sensors}>
        <main
          className={cn(
            'flex flex-col w-full',
            formData?.status === FormStatus.LIVE &&
              'opacity-50 pointer-events-none'
          )}
        >
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-full rounded-md border border-dashed">
            <div className="flex w-full max-h-3/4 justify-between">
              <DesignerDropArea />
              <DesignerSidebar />
            </div>
          </div>
        </main>
        <DragOverlayWrapper />
      </DndContext>
    </>
  );
};
