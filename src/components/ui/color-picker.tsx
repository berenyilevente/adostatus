'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  value?: string;
  onChange: (value: string) => void;
  showColorOptions?: boolean;
  placeholder?: string;
}

const defaultColors = [
  '#0ea5e9', // sky
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f43f5e', // rose
  '#f97316', // orange
  '#84cc16', // lime
];

export const ColorPicker = ({
  value,
  onChange,
  showColorOptions = true,
  placeholder,
}: ColorPickerProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      {showColorOptions && (
        <div className="flex gap-2">
          {defaultColors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                value === color
                  ? 'border-gray-900 scale-110'
                  : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center gap-2 border border-gray-200 rounded-md px-3 py-[1px] w-full">
        <div className="text-sm text-muted-foreground">{placeholder}</div>
        <Input
          id="custom-color"
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-8 p-1 cursor-pointer border-none shadow-none"
        />
      </div>
    </div>
  );
};
