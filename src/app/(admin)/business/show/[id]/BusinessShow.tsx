'use client';

import React from 'react';
import { Clock, Coffee, Users, DollarSign } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
} from '@/components';

import { useBusinessShow } from './use-business-show';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/formatCurrency';

import { cn } from '@/utils';
import { useBusinessServices } from '@/app/(admin)/business-services/use-business-services';
import { EditBusinessServicesDialog } from '@/app/(admin)/business-services/EditBusinessServiceDialog';
import { CreateBusinessServicesDialog } from '@/app/(admin)/business-services/CreateBusinessServiceDialog';
import { BusinessHoursCard } from '@/app/(admin)/business-hours/BusinessHoursCard';
import { BreakTimesCard } from '@/app/(admin)/business-hours/BreakTimesCard';
import { BusinessServicesCard } from '@/app/(admin)/business-services/BusinessServicesCard';
import { useBusinessHours } from '@/app/(admin)/business-hours/use-business-hours';
import { BusinessHoursDialog } from '@/app/(admin)/business-hours/BusinessHoursDialog';

const BusinessShow = () => {
  const router = useRouter();
  const { business, handleCancel, getBusinessTypeLabel } = useBusinessShow();

  const { services, handleCreateService } = useBusinessServices();
  const { openBusinessHoursDialog } = useBusinessHours();

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 w-full">
                    <Clock className="h-5 w-5" />
                    <span>Business Hours</span>
                  </div>
                  <Button
                    size="sm"
                    endIcon="edit"
                    onClick={openBusinessHoursDialog}
                    variant="outline"
                  >
                    Edit
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BusinessHoursCard.Content />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coffee className="h-5 w-5" />
                  <span>Break Times</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BreakTimesCard.Content />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 w-full">
                <DollarSign className="h-5 w-5" />
                <span>Services</span>
              </div>
              <Button
                size="sm"
                endIcon="plus"
                onClick={handleCreateService}
                variant="outline"
              >
                Add Service
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[500px]">
            <BusinessServicesCard.Content />
          </CardContent>
        </Card>
      </div>
      <CreateBusinessServicesDialog />
      <EditBusinessServicesDialog />
      <BusinessHoursDialog />
    </div>
  );
};

export { BusinessShow };
