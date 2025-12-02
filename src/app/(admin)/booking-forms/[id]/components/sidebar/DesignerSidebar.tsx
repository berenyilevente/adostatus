'use client';

import { useEditBookingForm } from '../../use-edit-booking-form';
import { FormElementsSidebar } from './FormElementsSidebar';
import { PropertiesFormSidebar } from './PropertiesFormSidebar';

export const DesignerSidebar = () => {
  const { selectedElement } = useEditBookingForm();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-[calc(100vh-100px)]">
      {!selectedElement ? <FormElementsSidebar /> : <></>}
      {selectedElement ? <PropertiesFormSidebar /> : <></>}
    </aside>
  );
};
