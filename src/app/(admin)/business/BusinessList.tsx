'use client';

import React from 'react';

import {
  Button,
  Card,
  CardContent,
  FormInput,
  FormSelect,
  FormWrapper,
  TableSearch,
} from '@/components';

import { useBusiness } from './use-business';
import { useRouter } from 'next/navigation';

export const BusinessList = () => {
  const router = useRouter();
  const { businessData, filterForm } = useBusiness();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full items-center gap-1 ">
        <FormWrapper form={filterForm} className="flex gap-4">
          <FormInput
            startIcon="search"
            control={filterForm.control}
            id="search"
            name="search"
            placeholder="Search businesses..."
          />
        </FormWrapper>
        <Button
          startIcon="plus"
          size="sm"
          iconSize="xs"
          variant="default"
          color="primary"
          onClick={() => router.push('/business/create')}
        >
          Add Business
        </Button>
      </div>
      {businessData.map((business) => (
        <Card className="bg-white" key={business.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium">{business.name}</p>
                <p className="text-xs text-gray-500">{business.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  endIcon="pencil"
                  variant="ghost"
                  onClick={() => router.push(`/business/${business.id}`)}
                />
                <Button size="icon" endIcon="trash" variant="ghost" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
