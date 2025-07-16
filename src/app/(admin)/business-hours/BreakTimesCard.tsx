import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { Clock, Clock3, Coffee } from 'lucide-react';
import { useBusinessHours } from './use-business-hours';
import { dateUtil } from '@/utils/date';

export const BreakTimesCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 w-full">
            <Clock className="h-5 w-5" />
            <span>Break Times</span>
          </div>
        </CardTitle>
        <CardContent>{children}</CardContent>
      </CardHeader>
    </Card>
  );
};

BreakTimesCard.Content = () => {
  const { breakTimes } = useBusinessHours();

  return breakTimes.length === 0 ? (
    <div className="text-center py-4 text-gray-500">
      <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
      <p className="text-sm">No business hours set</p>
    </div>
  ) : (
    <div className="space-y-3">
      {breakTimes.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          <Coffee className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No break times configured</p>
        </div>
      ) : (
        <div className="space-y-3">
          {breakTimes.map((breakTime, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-2">
                <div>
                  <Clock3 className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium">
                  {breakTime.dayOfWeek.map((day) => day).join(', ')}
                </span>
              </div>
              <div className="text-sm text-gray-600 whitespace-nowrap">
                {dateUtil.formatTime(breakTime.startTime)} -{' '}
                {dateUtil.formatTime(breakTime.endTime)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
