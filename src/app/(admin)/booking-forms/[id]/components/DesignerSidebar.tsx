'use client';

import { useDesignerContext } from './context/DesignerContext';
import { FormElements } from './FormElements';
import { FormElementsSidebar } from './FormElementsSidebar';
import { PropertiesFormSidebar } from './PropertiesFormSidebar';
import { SidebarButtonElement } from './SidebarButtonElement';

export const DesignerSidebar = () => {
  const { selectedElement } = useDesignerContext();

  return (
    <aside className="w-[300px] max-w-[300px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-[calc(100vh-100px)]">
      {!selectedElement ? <FormElementsSidebar /> : <></>}
      {selectedElement ? <PropertiesFormSidebar /> : <></>}
    </aside>
  );
};
