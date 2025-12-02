import { Button } from '@/components/ui/button';
import { FormElement } from '../edit-form.helper';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

export const SidebarButtonElement = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon } = formElement.designerButtonElement;

  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(draggable.isDragging && 'ring-2 ring-primary')}
      startIcon={icon}
    >
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon } = formElement.designerButtonElement;

  return (
    <Button variant="outline" size="sm" startIcon={icon}>
      <p className="text-xs">{label}</p>
    </Button>
  );
};
