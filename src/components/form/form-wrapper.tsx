import { ReactElement } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

interface FormWrapperProps {
  children: ReactElement | ReactElement[];
  form: UseFormReturn<any>;
  className?: string;
}

export const FormWrapper = ({
  children,
  form,
  className,
}: FormWrapperProps) => {
  return (
    <Form {...form}>
      <form className={className}>{children}</form>
    </Form>
  );
};
