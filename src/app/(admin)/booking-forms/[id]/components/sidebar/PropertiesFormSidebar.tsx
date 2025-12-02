import { ReactElement } from 'react';
import { useEditBookingForm } from '../../use-edit-booking-form';
import { ElementsType, FormElements } from '../../edit-form.helper';
import { Button, Separator } from '@/components';

export const PropertiesFormSidebar = (): ReactElement => {
  const { selectedElement, setSelectedElement } = useEditBookingForm();

  if (!selectedElement) {
    return <></>;
  }
  const ElementType: ElementsType = selectedElement.type;
  const PropertiesForm = FormElements[ElementType].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-foreground/70">Element Properties</p>
        <Button
          variant="ghost"
          size="icon"
          endIcon="close"
          onClick={() => setSelectedElement(null)}
        />
      </div>
      <Separator className="mb-4" />

      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};
