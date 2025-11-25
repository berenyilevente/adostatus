import { Separator } from '@/components';
import { FormElements } from './FormElements';
import { SidebarButtonElement } from './SidebarButtonElement';

export const FormElementsSidebar = () => {
  return (
    <>
      <div className="text-sm text-foreground/70">
        Drag and drop to add elements
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-2">
        <div className="text-sm text-foreground/70 text-start mt-2">
          Layout elements
        </div>
        <SidebarButtonElement formElement={FormElements.TitleField} />
        <SidebarButtonElement formElement={FormElements.SubtitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <SidebarButtonElement formElement={FormElements.SeperatorField} />
        <SidebarButtonElement formElement={FormElements.SpacerField} />
        <div className="text-sm text-foreground/70 text-start mt-2">
          Form elements
        </div>
        <SidebarButtonElement formElement={FormElements.TextField} />
      </div>
    </>
  );
};
