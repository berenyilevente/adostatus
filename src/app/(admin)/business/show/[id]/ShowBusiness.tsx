'use client';

import React from 'react';
import { format } from 'date-fns';
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Palette,
  Building2,
  Calendar,
  Coffee,
  Users,
  DollarSign,
  Clock3,
} from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components';

import { useShowBusiness } from './use-show-business';
import { businessTypes } from '../../business.helper';
import { useRouter } from 'next/navigation';

const ShowBusiness = () => {
  const { business, services, handleCancel } = useShowBusiness();
  const router = useRouter();

  const getBusinessTypeLabel = (type: string | null) => {
    if (!type) return 'Not specified';
    const found = businessTypes.find((t) => t.value === type);
    return found ? found.label : type;
  };

  const formatTime = (time: string) => {
    return format(new Date(`2000-01-01T${time}`), 'h:mm a');
  };

  const getDayLabel = (dayNumber: string) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[parseInt(dayNumber)] || dayNumber;
  };

  const formatCurrency = (price: string, currency: string | null) => {
    const currencySymbol =
      currency === 'USD'
        ? '$'
        : currency === 'EUR'
          ? '€'
          : currency === 'GBP'
            ? '£'
            : '$';
    return `${currencySymbol}${parseFloat(price || '0').toFixed(2)}`;
  };

  const formatDuration = (minutes: string | null) => {
    if (!minutes) return 'Not specified';
    const mins = parseInt(minutes);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
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
            {business.isActive && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {business.name}
            </h1>
            <p className="text-gray-600">
              {business.description || 'No description provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex justify-end space-x-3 pt-6">
            <Button variant="outline" onClick={handleCancel}>
              Back to List
            </Button>
            <Button
              onClick={() => router.push(`/business/edit/${business.id}`)}
            >
              Edit Business
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Business Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Business Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    Business Type
                  </label>
                  <p className="text-gray-900">
                    {getBusinessTypeLabel(business.businessType)}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={business.isActive ? 'default' : 'secondary'}
                    className="w-fit"
                  >
                    {business.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-6 w-6 rounded border"
                      style={{
                        backgroundColor: business.primaryColor || '#6B7280',
                      }}
                    />
                    <span className="text-gray-900">
                      {business.primaryColor || 'Not set'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">
                    Created
                  </label>
                  <p className="text-gray-900">
                    {format(new Date(business.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Services ({services.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {services.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No services configured yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{
                              backgroundColor: service.color || '#6B7280',
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {service.description || 'No description'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(
                              service.price || '0',
                              service.currency
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDuration(service.duration)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                        {service.bufferTime && (
                          <span>
                            Buffer: {formatDuration(service.bufferTime)}
                          </span>
                        )}
                        <Badge
                          variant={service.isActive ? 'default' : 'secondary'}
                        >
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Business Hours Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Business Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {business.businessHours.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No business hours set</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {business.businessHours.map((hours, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          {hours.dayOfWeek
                            .map((day) => getDayLabel(day))
                            .join(', ')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatTime(hours.openTime)} -{' '}
                        {formatTime(hours.closeTime)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Break Times Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coffee className="h-5 w-5" />
                <span>Break Times</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {business.breakTimes.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <Coffee className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No break times configured</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {business.breakTimes.map((breakTime, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        <Clock3 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          {breakTime.dayOfWeek
                            .map((day) => getDayLabel(day))
                            .join(', ')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatTime(breakTime.startTime)} -{' '}
                        {formatTime(breakTime.endTime)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {services.length}
                  </p>
                  <p className="text-sm text-blue-600">Services</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {services.filter((s) => s.isActive).length}
                  </p>
                  <p className="text-sm text-green-600">Active</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Revenue Potential</span>
                  <span className="font-medium">
                    {formatCurrency(
                      services
                        .reduce(
                          (sum, service) =>
                            sum + parseFloat(service.price || '0'),
                          0
                        )
                        .toString(),
                      'USD'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Average Service Price</span>
                  <span className="font-medium">
                    {services.length > 0
                      ? formatCurrency(
                          (
                            services.reduce(
                              (sum, service) =>
                                sum + parseFloat(service.price || '0'),
                              0
                            ) / services.length
                          ).toString(),
                          'USD'
                        )
                      : '$0.00'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { ShowBusiness };
