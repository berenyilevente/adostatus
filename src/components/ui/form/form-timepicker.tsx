"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { Control, FieldPath, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from "@/components";
import { cn } from "@/utils/combineClassNames";

type FormTimepickerProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> = {
  control: Control<TField>;
  name: TName;
  className?: string;
  label?: string;
  description?: string;
};

export const FormTimepicker = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  className,
  label,
  description,
}: FormTimepickerProps<TField, TName>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("05:00");

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
                    "w-full font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? time : <span>Pick a time</span>}
                  <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 flex items-start"
              align="start"
            >
              <div className="w-[120px] my-4 mr-2">
                <ScrollArea className="h-[18rem]">
                  <div className="flex flex-col gap-2 h-full">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4)
                        .toString()
                        .padStart(2, "0");
                      const minute = ((i % 4) * 15).toString().padStart(2, "0");
                      const timeValue = `${hour}:${minute}`;
                      return (
                        <Button
                          key={i}
                          className="w-full text-left px-2"
                          variant="outline"
                          onClick={() => {
                            field.onChange(timeValue);
                            setTime(timeValue);
                            setIsOpen(false);
                          }}
                        >
                          {timeValue}
                        </Button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
