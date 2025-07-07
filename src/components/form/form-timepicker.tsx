'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ClockIcon, CheckIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { Control, FieldPath, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ScrollArea,
} from '@/components';
import { cn } from '@/utils/combineClassNames';

type FormTimepickerProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> = {
  control: Control<TField>;
  name: TName;
  className?: string;
  label?: string;
  description?: string;
  placeholder?: string;
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
  placeholder,
}: FormTimepickerProps<TField, TName>) => {
  const [time, setTime] = useState<string>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col gap-1 mt-2 w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full font-normal',
                    !field.value && 'text-muted-foreground',
                    className,
                    { 'border-red-500': fieldState.error }
                  )}
                >
                  {field.value ? time : <span>{placeholder}</span>}
                  <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[120px] p-0" align="start">
              <ScrollArea className="h-[18rem]">
                <div className="flex flex-col gap-1 p-1">
                  {Array.from({ length: 96 }).map((_, i) => {
                    const hour = Math.floor(i / 4)
                      .toString()
                      .padStart(2, '0');
                    const minute = ((i % 4) * 15).toString().padStart(2, '0');
                    const timeValue = `${hour}:${minute}`;
                    const isSelected = field.value === timeValue;
                    return (
                      <DropdownMenuItem
                        key={i}
                        className="cursor-pointer"
                        onClick={() => {
                          field.onChange(timeValue);
                          setTime(timeValue);
                        }}
                      >
                        {timeValue}
                        {isSelected && (
                          <CheckIcon className="ml-auto h-4 w-4" />
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
FormTimepicker.displayName = 'FormTimepicker';
