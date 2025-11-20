'use client';

import { FormElements } from './FormElements';
import { SidebarButtonElement } from './SidebarButtonElement';

export const DesignerSidebar = () => {
  return (
    <aside className="w-[300px] max-w-[300px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-[calc(100vh-100px)]">
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </aside>
  );
};
