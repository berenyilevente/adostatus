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
  TimeFieldFormElement,
} from './components/fields';
import { FirstNameFieldFormElement } from './components/fields/defaultFormElements/FirstNameField';
import { LastNameFieldFormElement } from './components/fields/defaultFormElements/LastNameField';
import { EmailFieldFormElement } from './components/fields/defaultFormElements/EmailField';
import { PhoneNumberFieldFormElement } from './components/fields/defaultFormElements/PhoneNumberField';
import { StartTimeFieldFormElement } from './components/fields/defaultFormElements/StartTimeField';
import { EndTimeFieldFormElement } from './components/fields/defaultFormElements/EndTime';
import { BookingDateFieldFormElement } from './components/fields/defaultFormElements/BookingDateField';

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
  | 'TimeField'
  | 'FirstNameField'
  | 'LastNameField'
  | 'EmailField'
  | 'PhoneNumberField'
  | 'StartTimeField'
  | 'EndTimeField'
  | 'BookingDateField';

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
  TimeField: TimeFieldFormElement,
  FirstNameField: FirstNameFieldFormElement,
  LastNameField: LastNameFieldFormElement,
  EmailField: EmailFieldFormElement,
  PhoneNumberField: PhoneNumberFieldFormElement,
  StartTimeField: StartTimeFieldFormElement,
  EndTimeField: EndTimeFieldFormElement,
  BookingDateField: BookingDateFieldFormElement,
};
