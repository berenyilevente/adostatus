'use client';

import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { SidebarButtonElementDragOverlay } from './SidebarButtonElement';
import { ElementsType, FormElements } from './FormElements';
import { useDesignerContext } from './context/DesignerContext';

export const DragOverlayWrapper = () => {
  const { elements } = useDesignerContext();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: (event) => {
      setDraggedItem(null);
    },
    onDragEnd: (event) => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) {
    return null;
  }

  const isDesignerElement = draggedItem.data.current?.isDesignerElement;

  let node = <div>No drag overlay</div>;
  const isSidebarButtonElement =
    draggedItem.data.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type: ElementsType = draggedItem.data.current?.type;

    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  if (isDesignerElement) {
    const elementId = draggedItem.data.current?.elementId;
    const element = elements.find((element) => element.id === elementId);

    if (!element) {
      node = <div>Element not found</div>;
    } else {
      const DesignerElement = FormElements[element.type].designerComponent;
      node = (
        <div className="flex rounded-md px-4 py-2 pointer-events-none">
          <DesignerElement elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};
