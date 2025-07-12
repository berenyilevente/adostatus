'use client';

import React from 'react';
import {
  Clock,
  Building2,
  Calendar,
  Coffee,
  Users,
  DollarSign,
  Clock3,
  Shield,
  ArrowLeft,
} from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  TextField,
  StatusField,
  ColorField,
  DateField,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
} from '@/components';

import { useBusinessShow } from './use-business-show';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/formatCurrency';
import { CurrencyField } from '@/components/ui/currency-field';
import { AddServiceDialog } from '../../components/AddServiceDialog';
import { EditServiceDialog } from '../../components/EditServiceDialog';
import { BusinessHeader } from '../../components/BusinessHeader';
import { cn } from '@/utils';

const BusinessShow = () => {
  const router = useRouter();
  const {
    business,
    services,
    handleCancel,
    getBusinessTypeLabel,
    formatTime,
    getDayLabel,
    formatDuration,
    isEditServiceModalOpen,
    setIsEditServiceModalOpen,
    selectedService,
    handleEditService,
    handleServiceUpdated,
  } = useBusinessShow();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="flex items-center space-x-2"
            startIcon="arrowLeft"
          >
            <span>Back to Businesses</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Business Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Details Card */}
          <div className="flex flex-row w-full gap-4">
            <Card className="w-full">
              <CardContent className="space-y-4 mt-4">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={business.logoUrl || undefined} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {business.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {business.name || 'Unnamed Business'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {business.description || 'No description'}
                      </p>
                    </div>
                  </div>

                  {/* TODO: Move edit business to a modal */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/business/edit/${business.id}`)}
                  >
                    Edit Business
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        business.isActive
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      )}
                    >
                      {business.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Business Type:</span>
                    <Badge
                      variant="secondary"
                      className={getBusinessTypeLabel(business.businessType)}
                    >
                      {getBusinessTypeLabel(business.businessType)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Primary Color:</span>
                    <div
                      className="h-6 w-6 rounded border"
                      style={{
                        backgroundColor: business.primaryColor || '#6B7280',
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900 text-sm">
                      {new Date(business.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full">
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
                    <span className="text-gray-500">
                      Total Revenue Potential
                    </span>
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
          <div className="flex flex-row w-full gap-4">
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
                        <div className="flex items-center space-x-4">
                          <div>
                            <Calendar className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium">
                            {hours.dayOfWeek
                              .map((day) => getDayLabel(day))
                              .join(', ')}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 whitespace-nowrap">
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
                          <div>
                            <Clock3 className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium">
                            {breakTime.dayOfWeek
                              .map((day) => getDayLabel(day))
                              .join(', ')}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 whitespace-nowrap">
                          {formatTime(breakTime.startTime)} -{' '}
                          {formatTime(breakTime.endTime)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 w-full">
                <DollarSign className="h-5 w-5" />
                <span>Services</span>
              </div>
              <AddServiceDialog />
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[500px]">
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
                      <StatusField
                        value={service.isActive ? 'active' : 'inactive'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Service Dialog */}
      {selectedService && (
        <EditServiceDialog
          service={selectedService}
          isOpen={isEditServiceModalOpen}
          onOpenChange={setIsEditServiceModalOpen}
          onServiceUpdated={handleServiceUpdated}
        />
      )}
    </div>
  );
};

export { BusinessShow };
