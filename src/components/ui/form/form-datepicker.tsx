"use client";

import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { format } from "date-fns";

import {
  Button,
  Calendar,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/utils";
import { useState } from "react";

type FormDatepickerProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> = {
  control: Control<TField>;
  name: TName;
  className?: string;
  label?: string;
  description?: string;
};

export const FormDatepicker = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  className,
  label,
  description,
}: FormDatepickerProps<TField, TName>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsOpen(false);
                }}
                initialFocus
                className={cn(className)}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
