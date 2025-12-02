'use client';

import { Control } from 'react-hook-form';
import { IconType } from '@/components/ui/icon';
import {
  TextFieldFormElement,
  TitleFieldFormElement,
  SubtitleFieldFormElement,
  ParagraphFieldFormElement,
  SeperatorFieldFormElement,
  SpacerFieldFormElement,
  NumberFieldFormElement,
  TextAreaFieldFormElement,
  DateFieldFormElement,
  DateTimeFieldFormElement,
} from './components/fields';

export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubtitleField'
  | 'ParagraphField'
  | 'SeperatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'DateTimeField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: IconType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    control: Control<any>;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeperatorField: SeperatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  DateTimeField: DateTimeFieldFormElement,
};
