'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  value?: string;
  onChange: (value: string) => void;
}

const defaultColors = [
  '#0ea5e9', // sky
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f43f5e', // rose
  '#f97316', // orange
  '#84cc16', // lime
  '#14b8a6', // teal
];

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex gap-2">
        {defaultColors.map((color) => (
          <button
            key={color}
            type="button"
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              value === color ? 'border-gray-900 scale-110' : 'border-gray-200'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
      <Input
        id="custom-color"
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-8 p-1 cursor-pointer"
      />
    </div>
  );
};
