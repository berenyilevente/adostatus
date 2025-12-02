'use client';

import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';
import { useDropAreaMonitor } from '../hooks/useDropAreaMonitor';
import { DesignerElementWrapper } from './DesignerElementWrapper';
import { useEditBookingForm } from '../use-edit-booking-form';

const EmptyDropArea = () => {
  const { elements } = useEditBookingForm();

  if (elements.length !== 0) {
    return <></>;
  }

  return (
    <div className="text-muted-foreground flex flex-grow items-center">
      Drag and drop to add fields
    </div>
  );
};

export const DesignerDropArea = () => {
  const { elements, selectedElement, setSelectedElement } =
    useEditBookingForm();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isDesignerDropArea: true },
  });

  const resetSelectedElement = () => {
    if (selectedElement) {
      setSelectedElement(null);
    }
  };

  useDropAreaMonitor();

  return (
    <div className="p-4 w-full" onClick={resetSelectedElement}>
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'max-w-3/4 h-full m-auto flex flex-col flex-grow items-center flex-1 overflow-y-auto w-full',
          droppable.isOver && 'ring ring-primary rounded-md'
        )}
      >
        <EmptyDropArea />
        {elements &&
          elements.length > 0 &&
          elements.map((element) => (
            <DesignerElementWrapper key={element.id} element={element} />
          ))}
      </div>
    </div>
  );
};
