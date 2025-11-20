'use client';

import { cn } from '@/lib/utils';
import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';
import { DesignerSidebar } from './DesignerSidebar';
import { useDesignerContext } from './context/DesignerContext';
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from './FormElements';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const idGenerator = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

export const Designer = () => {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesignerContext();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;

      if (!active || !over) {
        return;
      }

      const isDesignerButtonElement =
        active.data.current?.isDesignerButtonElement;

      if (isDesignerButtonElement) {
        const type: ElementsType = active.data.current?.type;
        const newElement = FormElements[type].construct(idGenerator());
        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full max-h-3/4 justify-between">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'max-w-3/4 h-full m-auto flex flex-col flex-grow items-center flex-1 overflow-y-auto w-full',
            droppable.isOver && 'ring ring-secondary'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <div className="text-muted-foreground flex flex-grow items-center">
              Drag and drop to add fields
            </div>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-1 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements &&
            elements.length > 0 &&
            elements.map((element) => (
              <DesignerElementWrapper key={element.id} element={element} />
            ))}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement, selectedElement, setSelectedElement } =
    useDesignerContext();
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

  const DesignerElement = FormElements[element.type].designerComponent;

  if (draggable.isDragging) {
    return null;
  }

  console.log(selectedElement);

  return (
    <div
      {...draggable.attributes}
      {...draggable.listeners}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      ref={draggable.setNodeRef}
      className="relative w-full h-[120px] flex flex-col text-foreground hover:cursor-pointer ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute  w-full h-1/2 bottom-0 rounded-b-md"
      />
      {isMouseOver && (
        <div className="flex items-center justify-between absolute w-full top-1/2 -translate-y-1/2">
          <span />
          <div className="animate-pulse text-center">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
          <Button
            className="h-full! mr-6"
            variant="destructive"
            size="icon"
            endIcon="trash"
            onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id);
            }}
          />
        </div>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[3px] bg-primary"></div>
      )}
      <div
        className={cn(
          'flex h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none',
          isMouseOver && 'opacity-40'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[3px] bg-primary"></div>
      )}
    </div>
  );
};
