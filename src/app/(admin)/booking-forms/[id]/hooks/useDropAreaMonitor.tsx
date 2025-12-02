'use client';

import { useDndMonitor } from '@dnd-kit/core';
import { useEditBookingForm } from '../use-edit-booking-form';
import { ElementsType, FormElements } from '../edit-form.helper';

const formElementIdGenerator = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

export const useDropAreaMonitor = () => {
  const { elements, addElement, removeElement } = useEditBookingForm();
  return useDndMonitor({
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
        const newElement = FormElements[type].construct(
          formElementIdGenerator()
        );
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
        const newElement = FormElements[type].construct(
          formElementIdGenerator()
        );
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
};
