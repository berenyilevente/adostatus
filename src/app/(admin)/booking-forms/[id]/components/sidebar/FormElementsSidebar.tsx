import { Separator } from '@/components';
import { SidebarButtonElement } from '../SidebarButtonElement';
import { FormElements } from '../../edit-form.helper';

export const FormElementsSidebar = () => {
  return (
    <>
      <div className="text-sm text-foreground/70">
        Drag and drop to add elements
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 text-sm text-foreground/70 text-start">
          Layout elements
        </div>
        <SidebarButtonElement formElement={FormElements.TitleField} />
        <SidebarButtonElement formElement={FormElements.SubtitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <SidebarButtonElement formElement={FormElements.SeperatorField} />
        <SidebarButtonElement formElement={FormElements.SpacerField} />
        <div className="col-span-2 text-sm text-foreground/70 text-start mt-3">
          Default form elements
        </div>
        <SidebarButtonElement formElement={FormElements.FirstNameField} />
        <SidebarButtonElement formElement={FormElements.LastNameField} />
        <SidebarButtonElement formElement={FormElements.EmailField} />
        <SidebarButtonElement formElement={FormElements.PhoneNumberField} />
        <SidebarButtonElement formElement={FormElements.BookingDateField} />
        <SidebarButtonElement formElement={FormElements.StartTimeField} />
        <SidebarButtonElement formElement={FormElements.EndTimeField} />
        <div className="col-span-2 text-sm text-foreground/70 text-start mt-3">
          Custom form elements
        </div>
        <SidebarButtonElement formElement={FormElements.TextField} />
        <SidebarButtonElement formElement={FormElements.NumberField} />
        <SidebarButtonElement formElement={FormElements.TextAreaField} />
        <SidebarButtonElement formElement={FormElements.DateField} />
        <SidebarButtonElement formElement={FormElements.TimeField} />
      </div>
    </>
  );
};
