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
import { useForm } from 'react-hook-form';
import { FormWrapper } from '@/components';

const idGenerator = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

export const Designer = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesignerContext();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isDesignerDropArea: true },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;

      if (!active || !over) {
        return;
      }

      const isDesignerButtonElement =
        active.data.current?.isDesignerButtonElement;
      const isDroppingOverDesignerDropArea =
        over.data.current?.isDesignerDropArea;

      // First scenario: Dropping a button element over the designer drop area
      const droppingSidebarButtonOverDesignerDropArea =
        isDesignerButtonElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarButtonOverDesignerDropArea) {
        const type: ElementsType = active.data.current?.type;
        const newElement = FormElements[type].construct(idGenerator());
        addElement(elements.length, newElement);
      }

      // Second scenario: Dropping an element over the designer drop area
      const droppingElementOverDesignerElementTopHalf =
        over.data.current?.isTopHalfDesignerElement;

      const droppingElementOverDesignerElementBottomHalf =
        over.data.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        droppingElementOverDesignerElementTopHalf ||
        droppingElementOverDesignerElementBottomHalf;

      const droppingElementOverDesignerElement =
        isDesignerButtonElement && isDroppingOverDesignerElement;

      if (droppingElementOverDesignerElement) {
        const type: ElementsType = active.data.current?.type;
        const newElement = FormElements[type].construct(idGenerator());
        const overId = over.data.current?.elementId;

        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );

        if (overElementIndex === -1) {
          throw new Error('Over element not found');
        }

        let indexForNewElement = overElementIndex; // Assuming I am on top half
        if (droppingElementOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data.current?.isDesignerElement;

      // Third scenario: Dragging a designer element over another designer element
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data.current?.elementId;
        const overId = over.data.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (element) => element.id === activeId
        );

        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Active or over element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };

        let indexForNewElement = overElementIndex; // Assuming I am on top half
        if (droppingElementOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        removeElement(activeElement.id);
        addElement(indexForNewElement, activeElement);
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
            droppable.isOver && 'ring ring-primary rounded-md'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <div className="text-muted-foreground flex flex-grow items-center">
              Drag and drop to add fields
            </div>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-1 w-full">
              <div className="rounded-md bg-primary/20"></div>
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
  const { removeElement, setSelectedElement } = useDesignerContext();
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
          'flex items-center rounded-md px-4 py-2 pointer-events-none',
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
