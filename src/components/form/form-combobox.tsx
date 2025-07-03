'use client';

import { ReactElement, useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Check, ChevronsUpDown } from 'lucide-react';

import {
  FormItem,
  FormMessage,
  FormDescription,
  FormControl,
  FormLabel,
  FormField,
  Popover,
  PopoverContent,
  CommandList,
  Command,
  CommandItem,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  PopoverTrigger,
  Button,
} from '@/components';
import { cn } from '@/utils';

interface FormComboboxProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> {
  control: Control<TField>;
  name: TName;
  options: { label: string; value: string }[];
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

export const FormCombobox = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  options,
  className,
}: FormComboboxProps<TField, TName>): ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'justify-between',
                    !field.value && 'text-muted-foreground',
                    className
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-auto opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder={placeholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          field.onChange(option.value);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        {option.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            option.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
FormCombobox.displayName = 'FormCombobox';
