import { Card, CardContent, Button, Badge } from '@/components';
import { cn } from '@/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Business } from '@/generated/prisma';
import { useBusiness } from '../use-business';

export const BusinessCard = ({ business }: { business: Business }) => {
  const router = useRouter();
  const { openDeleteDialog } = useBusiness();

  return (
    <Card className="bg-white" key={business.id}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={business.logoUrl || undefined} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {business.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {business.name || 'Unnamed Business'}
                </h3>
                <Badge variant="outline" className={cn(business.primaryColor)}>
                  {business.businessType}
                </Badge>
                {!business.isActive && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-600"
                  >
                    Inactive
                  </Badge>
                )}
              </div>

              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                {business.description && (
                  <div className="flex items-center space-x-1">
                    <span>{business.description}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/business/show/${business.id}`)}
              className="flex items-center space-x-1"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => openDeleteDialog(business.id)}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
