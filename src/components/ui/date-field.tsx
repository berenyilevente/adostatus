import { cn } from '@/utils/combineClassNames';
import dayjs from 'dayjs';
import { Label } from '@radix-ui/react-label';

interface DateFieldProps {
  value: Date;
  className?: string;
}

export const DateField = ({ value, className }: DateFieldProps) => {
  return (
    <div className={cn('space-y-1', className)}>
      <Label className="text-sm font-medium text-gray-500">Created</Label>
      <p className="text-gray-900 text-sm">
        {dayjs(value).format('MMM DD, YYYY')}
      </p>
    </div>
  );
};
