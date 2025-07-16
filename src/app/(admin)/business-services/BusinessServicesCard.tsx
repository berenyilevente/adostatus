import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CurrencyField,
  StatusField,
} from '@/components';
import { Clock, DollarSign } from 'lucide-react';
import { dateUtil } from '@/utils/date';
import { useBusinessServices } from './use-business-services';

export const BusinessServicesCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 w-full">
            <Clock className="h-5 w-5" />
            <span>Business Hours</span>
          </div>
        </CardTitle>
        <CardContent>{children}</CardContent>
      </CardHeader>
    </Card>
  );
};

BusinessServicesCard.Content = () => {
  const { services, handleEditService } = useBusinessServices();

  return services.length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>No services configured yet</p>
    </div>
  ) : (
    <div className="space-y-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => handleEditService(service)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 text-muted-foreground">
                  {service.description || 'No description'}
                </p>
              </div>
            </div>
            <div className="text-right text-sm">
              <CurrencyField
                price={service.price}
                currency={service.currency}
              />
              <p className="text-sm text-gray-500">
                {dateUtil.formatDuration(service.duration)}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
            {service.bufferTime && (
              <span>Buffer: {dateUtil.formatDuration(service.bufferTime)}</span>
            )}
            <StatusField value={service.isActive ? 'active' : 'inactive'} />
          </div>
        </div>
      ))}
    </div>
  );
};
