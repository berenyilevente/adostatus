"use client";

import { ReactElement } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/navigation";
import { Save, Settings, FormInput } from "lucide-react";

import { useCreateBookingForm } from "./use-create-booking-form";
import { fieldTypes } from "../booking-form.helper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";

import { FormPreview } from "./components/FormPreview";
import { FormSettings } from "./components/FormSettings";
import { FormDraggableField } from "./components/FormDraggableField";
import { FormDropArea } from "./components/FormDropArea";

export const FormBuilder = (): ReactElement => {
  const router = useRouter();
  const { isSaving, saveForm } = useCreateBookingForm();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="flex space-x-2 mt-4 justify-end">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/booking-forms");
            }}
            startIcon="close"
          >
            Cancel
          </Button>
          <Button onClick={saveForm} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Form"}
          </Button>
        </div>

        <Tabs defaultValue="builder">
          <TabsList>
            <TabsTrigger value="builder">
              <FormInput className="h-4 w-4 mr-2" />
              Form Builder
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Form Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Form Elements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {fieldTypes.map((fieldType) => (
                        <FormDraggableField
                          key={fieldType.id}
                          type={fieldType.id}
                          label={fieldType.label}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Form Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormDropArea />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <FormPreview />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <FormSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
};
