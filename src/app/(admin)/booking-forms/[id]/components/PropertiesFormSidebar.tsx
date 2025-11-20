import { ReactElement } from 'react';
import { useDesignerContext } from './context/DesignerContext';
import { FormElements } from './FormElements';
import { Button, Separator } from '@/components';

export const PropertiesFormSidebar = (): ReactElement => {
  const { selectedElement, setSelectedElement } = useDesignerContext();

  if (!selectedElement) {
    return <></>;
  }

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

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
