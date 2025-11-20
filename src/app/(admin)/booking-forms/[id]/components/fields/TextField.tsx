'use client';

import { Icon, Input, Label } from '@/components';
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '../FormElements';

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text Field',
  helpText: 'This is a text field',
  required: false,
  placeholder: 'Enter text...',
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButtonElement: {
    icon: Icon,
    label: 'Text Field',
  },
  designerComponent: (props) => <DesignerComponent {...props} />,
  formComponent: () => <div>TextFieldForm</div>,
  properties: () => <div>TextFieldProperties</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  return (
    <div className="border-2 rounded-md p-2 w-full">
      <Label className="text-sm font-medium text-gray-500">
        {element.extraAttributes.label}
      </Label>
      <Input placeholder={element.extraAttributes.placeholder} disabled />
      <p className="text-xs text-muted-foreground">
        {element.extraAttributes.helpText}
      </p>
    </div>
  );
};
