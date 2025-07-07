import { cn } from '@/utils/combineClassNames';
import { Label } from '@radix-ui/react-label';

interface TextFieldProps {
  label: string;
  value: string;
  className?: string;
}

export const TextField = ({ label, value, className }: TextFieldProps) => {
  return (
    <div className={cn('space-y-1', className)}>
      <Label className="text-sm font-medium text-gray-500">{label}</Label>
      <p className="text-gray-900 text-sm">{value}</p>
    </div>
  );
};
