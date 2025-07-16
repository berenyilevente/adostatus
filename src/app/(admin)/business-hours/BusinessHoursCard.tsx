import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';
import { Calendar, Clock } from 'lucide-react';
import { useBusinessHours } from './use-business-hours';
import { dateUtil } from '@/utils/date';

export const BusinessHoursCard = ({
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

BusinessHoursCard.Content = () => {
  const { businessHours } = useBusinessHours();

  return businessHours.length === 0 ? (
    <div className="text-center py-4 text-gray-500">
      <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
      <p className="text-sm">No business hours set</p>
    </div>
  ) : (
    <div className="space-y-3">
      {businessHours.map((hours, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div className="flex items-center space-x-4">
            <div>
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium">
              {hours.dayOfWeek.map((day) => day).join(', ')}
            </span>
          </div>
          <div className="text-sm text-gray-600 whitespace-nowrap">
            {dateUtil.formatTime(hours.openTime)} -{' '}
            {dateUtil.formatTime(hours.closeTime)}
          </div>
        </div>
      ))}
    </div>
  );
};
