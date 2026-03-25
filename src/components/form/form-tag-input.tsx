'use client';

import { ReactNode, useState, KeyboardEvent } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  IconType,
  Input,
  Badge,
} from '@/components';

const iconBaseClassNames = 'absolute top-[18px] -translate-y-1/2 text-gray-400';

const StartIcon = ({ startIcon, label }: { startIcon?: IconType; label?: boolean }) => {
  if (!startIcon) {
    return null;
  }

  return (
    <Icon
      icon={startIcon}
      className={cn(iconBaseClassNames, 'left-3', label && '!top-[31px]')}
      size="xs"
    />
  );
};

const EndIcon = ({ endIcon, label }: { endIcon?: IconType; label?: boolean }) => {
  if (!endIcon) {
    return null;
  }

  return (
    <Icon
      icon={endIcon}
      size="xs"
      className={cn(iconBaseClassNames, 'right-3', label && '!top-[31px]')}
    />
  );
};

interface FormTagInputProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  control: Control<TField, object>;
  name: TName;
  placeholder?: string;
  startIcon?: IconType;
  endIcon?: IconType;
  endIconComponent?: ReactNode;
  label?: string;
  description?: string;
  maxTags?: number;
  tagSeparator?: string;
}

export const FormTagInput = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  placeholder = 'Type and press Enter to add tags...',
  className,
  startIcon,
  endIcon,
  endIconComponent,
  label,
  description,
  maxTags,
  tagSeparator = ',',
  ...props
}: FormTagInputProps<TField, TName>) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const tags = (Array.isArray(field.value) ? field.value : []) as string[];

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        };

        const addTag = (tag: string) => {
          const trimmedTag = tag.trim();
          if (trimmedTag && !tags.includes(trimmedTag) && (!maxTags || tags.length < maxTags)) {
            const newTags = [...tags, trimmedTag];
            field.onChange(newTags);
            setInputValue('');
          }
        };

        const removeTag = (tagToRemove: string) => {
          const newTags = tags.filter((tag) => tag !== tagToRemove);
          field.onChange(newTags);
        };

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' || e.key === tagSeparator) {
            e.preventDefault();
            addTag(inputValue);
          } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
          }
        };

        const handleBlur = () => {
          if (inputValue.trim()) {
            addTag(inputValue);
          }
        };

        return (
          <FormItem className={cn('relative flex flex-col', className)}>
            <FormLabel>{label}</FormLabel>
            <StartIcon startIcon={startIcon} label={!!label} />
            <FormControl>
              <div className="relative">
                <div
                  className={cn(
                    'flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    startIcon && 'pl-10',
                    endIcon && 'pr-10',
                    {
                      'border-red-500': fieldState.error,
                    }
                  )}
                >
                  <div className="flex flex-wrap gap-1 items-center flex-1">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1 text-xs"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive focus:outline-none"
                        >
                          <Icon icon="close" size="xs" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      {...props}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onBlur={handleBlur}
                      placeholder={tags.length === 0 ? placeholder : ''}
                      className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                      disabled={maxTags ? tags.length >= maxTags : false}
                    />
                  </div>
                </div>
              </div>
            </FormControl>
            <EndIcon endIcon={endIcon} label={!!label} />
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

FormTagInput.displayName = 'FormTagInput';
