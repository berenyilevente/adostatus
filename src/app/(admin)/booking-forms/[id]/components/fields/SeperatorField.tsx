'use client';

import { Label, Separator } from '@/components';
import { memo } from 'react';
import { ElementsType, FormElement } from '../FormElements';

const type: ElementsType = 'SeperatorField';

export const SeperatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => {
    return { id, type };
  },
  designerButtonElement: { icon: 'seperator', label: 'Seperator Field' },
  designerComponent: () => <DesignerComponent />,
  formComponent: () => <FormComponent />,
  propertiesComponent: () => <PropertiesComponent />,
};

const DesignerComponent = () => {
  return (
    <div className="p-1 w-full">
      <Label className="text-sm font-medium text-gray-500">
        <Separator />
      </Label>
    </div>
  );
};

const PropertiesComponent = () => {
  return (
    <p className="text-sm text-muted-foreground">
      No properties available for this element type.
    </p>
  );
};

const FormComponent = memo(() => {
  return <Separator />;
});
