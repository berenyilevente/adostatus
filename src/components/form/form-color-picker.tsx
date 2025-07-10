import { FormMessage } from '../ui/form';

import { ColorPicker } from '../ui/color-picker';
import { FormControl } from '../ui/form';

import { FormLabel } from '../ui/form';

import { FormItem } from '../ui/form';

import { FormField } from '../ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { IconType } from '..';

interface FormColorPickerProps<
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
> extends React.ComponentProps<'input'> {
  control: Control<TField, object>;
  name: TName;
  label?: string;
  showColorOptions?: boolean;
  placeholder?: string;
}

export const FormColorPicker = <
  TField extends FieldValues = FieldValues,
  TName extends FieldPath<TField> = FieldPath<TField>,
>({
  control,
  name,
  label,
  showColorOptions = false,
  placeholder,
}: FormColorPickerProps<TField, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <ColorPicker
              value={field.value}
              onChange={field.onChange}
              showColorOptions={showColorOptions}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
