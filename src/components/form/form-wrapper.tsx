import { ReactElement } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Form } from '../ui/form';

interface FormWrapperProps {
  children: ReactElement | ReactElement[];
  form: UseFormReturn<any>;
  className?: string;
  onSubmit?: SubmitHandler<any>;
}

export const FormWrapper = ({
  children,
  form,
  className,
  onSubmit,
}: FormWrapperProps) => {
  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
      >
        {children}
      </form>
    </Form>
  );
};
