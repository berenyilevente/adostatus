import { Avatar, AvatarFallback, AvatarImage } from '@/components';
import { useBusinessShow } from '../show/[id]/use-business-show';

export const BusinessHeader = () => {
  const { business } = useBusinessShow();

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={business.logoUrl || undefined}
            alt={business.name}
          />
          <AvatarFallback className="text-lg font-semibold">
            {business.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
        <p className="text-gray-600">
          {business.description || 'No description provided'}
        </p>
      </div>
    </div>
  );
};
