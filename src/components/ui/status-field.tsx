import { cn } from '@/utils/combineClassNames';
import { Badge } from './badge';
import { Label } from '@radix-ui/react-label';

interface StatusFieldProps {
  value: 'active' | 'inactive' | 'archived' | 'draft' | 'live';
  className?: string;
}

export const StatusField = ({ value, className }: StatusFieldProps) => {
  const statusColorMap = {
    active: 'bg-green-500 text-white',
    inactive: 'bg-red-500 text-white',
    archived: 'bg-yellow-500 text-white',
    draft: 'bg-slate-500 text-white',
    live: 'bg-green-500 text-white',
  };

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      <Label className="text-sm font-medium text-gray-500">Status</Label>
      <Badge
        className={cn(
          statusColorMap[value as keyof typeof statusColorMap],
          'hover:cursor-pointer',
          'w-fit'
        )}
      >
        {value}
      </Badge>
    </div>
  );
};
