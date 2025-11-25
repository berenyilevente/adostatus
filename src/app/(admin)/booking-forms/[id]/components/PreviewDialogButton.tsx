import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  FormWrapper,
} from '@/components';
import { useDesignerContext } from './context/DesignerContext';
import { FormElements } from './FormElements';
import { useForm } from 'react-hook-form';

export const PreviewDialogButton = () => {
  const { elements } = useDesignerContext();
  const form = useForm<any>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <DialogTitle>
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
        </DialogTitle>
        <div className="px-4 py-2 border-b">
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to the user.
          </p>
        </div>
        <div className="bg-accent flex-col flex flex-grow items-center justify-center p-4 overflow-y-auto">
          <FormWrapper
            form={form}
            className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto"
          >
            <div className="w-full">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;
                return (
                  <FormComponent
                    key={element.id}
                    elementInstance={element}
                    control={form.control}
                  />
                );
              })}
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </div>
          </FormWrapper>
        </div>
      </DialogContent>
    </Dialog>
  );
};
