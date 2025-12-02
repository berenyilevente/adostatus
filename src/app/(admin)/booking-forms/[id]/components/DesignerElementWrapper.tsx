'use client';

import { Button } from '@/components';
import { cn } from '@/lib/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '../edit-form.helper';
import { useEditBookingForm } from '../use-edit-booking-form';

const EditElementProperties = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement } = useEditBookingForm();

  const handleRemoveElement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeElement(element.id);
  };

  return (
    <div className="flex items-center justify-between absolute w-full top-1/2 -translate-y-1/2 z-10">
      <span />
      <div className="animate-pulse text-center">
        <p className=" text-sm">Click for properties or drag to move</p>
      </div>
      <Button
        className="h-full! mr-6"
        variant="destructive"
        size="icon"
        endIcon="trash"
        onClick={handleRemoveElement}
      />
    </div>
  );
};

const DragOverlayBorderTop = () => {
  return (
    <div className="absolute top-0 w-full rounded-md h-[3px] bg-primary" />
  );
};

const DragOverlayBorderBottom = () => {
  return (
    <div className="absolute bottom-0 w-full rounded-md h-[3px] bg-primary" />
  );
};

export const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { setSelectedElement } = useEditBookingForm();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const ElementType: ElementsType = element.type;

  const DesignerElement = FormElements[ElementType].designerComponent;

  const onSelectElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  if (draggable.isDragging) {
    return null;
  }

  return (
    <div
      {...draggable.attributes}
      {...draggable.listeners}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={onSelectElement}
      ref={draggable.setNodeRef}
      className="relative w-full rounded-md my-1 flex flex-col text-foreground hover:cursor-pointer ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      />
      {isMouseOver && <EditElementProperties element={element} />}
      {topHalf.isOver && <DragOverlayBorderTop />}
      <div
        className={cn(
          'flex items-center rounded-md px-4 py-2 pointer-events-none',
          isMouseOver && 'opacity-40'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && <DragOverlayBorderBottom />}
    </div>
  );
};
