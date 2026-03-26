import { ReactElement } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Form } from '../ui/form';

interface FormWrapperProps<T extends FieldValues = FieldValues> {
  children: ReactElement | ReactElement[];
  form: UseFormReturn<T>;
  className?: string;
  onSubmit?: SubmitHandler<T>;
}

export const FormWrapper = <T extends FieldValues>({ children, form, className, onSubmit }: FormWrapperProps<T>) => {
  return (
    <Form {...form}>
      <form className={className} onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}>
        {children}
      </form>
    </Form>
  );
};
