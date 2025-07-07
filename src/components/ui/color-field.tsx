import { cn } from '@/utils/combineClassNames';
import { Label } from '@radix-ui/react-label';

interface ColorFieldProps {
  value: string;
  className?: string;
}

export const ColorField = ({ value, className }: ColorFieldProps) => {
  return (
    <div className={cn('space-y-1', className)}>
      <Label className="text-sm font-medium text-gray-500">Primary Color</Label>
      <div className="flex items-center space-x-2">
        <div
          className="h-6 w-6 rounded border"
          style={{
            backgroundColor: value || '#6B7280',
          }}
        />
      </div>
    </div>
  );
};
