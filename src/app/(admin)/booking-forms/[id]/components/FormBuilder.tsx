'use client';

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Designer } from './Designer';
import { DragOverlayWrapper } from './DragOverlayWrapper';
import {
  DesignerContextProvider,
  useDesignerContext,
} from './context/DesignerContext';
import { useEffect } from 'react';
import { useEditBookingForm } from '../use-edit-booking-form';

export const FormBuilder = () => {
  const { formData } = useEditBookingForm();
  const { setElements } = useDesignerContext();
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
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-full bg-accent">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};
