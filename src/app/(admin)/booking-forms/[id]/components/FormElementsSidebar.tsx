import { FormElements } from './FormElements';
import { SidebarButtonElement } from './SidebarButtonElement';

export const FormElementsSidebar = () => {
  return (
    <>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </>
  );
};
