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
  FirstNameFieldFormElement,
  LastNameFieldFormElement,
  EmailFieldFormElement,
  PhoneNumberFieldFormElement,
  StartTimeFieldFormElement,
  EndTimeFieldFormElement,
  BookingDateFieldFormElement,
} from './components/fields';

type DefaultFormElements =
  | 'FirstNameField'
  | 'LastNameField'
  | 'EmailField'
  | 'PhoneNumberField'
  | 'StartTimeField'
  | 'EndTimeField'
  | 'BookingDateField';

type LayoutElements =
  | 'TitleField'
  | 'SubtitleField'
  | 'ParagraphField'
  | 'SeperatorField'
  | 'SpacerField';

type CustomFormElements = 'NumberField' | 'TextAreaField' | 'TextField';

export type ElementsType =
  | CustomFormElements
  | DefaultFormElements
  | LayoutElements;

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

type LayoutElementsType = {
  [key in LayoutElements]: FormElement;
};

type CustomFormElementsType = {
  [key in CustomFormElements]: FormElement;
};

type DefaultFormElementsType = {
  [key in DefaultFormElements]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const LayoutElements: LayoutElementsType = {
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeperatorField: SeperatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
};

export const CustomFormElements: CustomFormElementsType = {
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  TextField: TextFieldFormElement,
};

export const DefaultFormElements: DefaultFormElementsType = {
  FirstNameField: FirstNameFieldFormElement,
  LastNameField: LastNameFieldFormElement,
  EmailField: EmailFieldFormElement,
  PhoneNumberField: PhoneNumberFieldFormElement,
  StartTimeField: StartTimeFieldFormElement,
  EndTimeField: EndTimeFieldFormElement,
  BookingDateField: BookingDateFieldFormElement,
};

export const FormElements: FormElementsType = {
  ...LayoutElements,
  ...CustomFormElements,
  ...DefaultFormElements,
};
