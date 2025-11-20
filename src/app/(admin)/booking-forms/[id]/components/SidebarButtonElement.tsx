import { Button } from '@/components/ui/button';
import { FormElement } from './FormElements';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

export const SidebarButtonElement = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

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
    >
      <Icon icon="form" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button variant="outline" size="sm">
      <Icon icon="form" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};
