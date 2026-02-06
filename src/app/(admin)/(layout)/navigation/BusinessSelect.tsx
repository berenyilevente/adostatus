'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { ReactElement, useEffect, useState } from 'react';
import { getBusinesses } from '../../business/actions';
import { Business } from '@/generated/prisma';
import { toast } from 'sonner';

export const BusinessSelect = (): ReactElement => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const businesses = await getBusinesses();
      if (businesses.status === 'success' && businesses.data) {
        setBusinesses(businesses.data);
        setSelectedBusinessId(businesses.data[0].id);
      }
      if (businesses.status === 'error') {
        toast.error(businesses.error);
      }
    };

    fetchBusinesses();
  }, []);

  const handleBusinessChange = (value: string) => {
    setSelectedBusinessId(value);
  };

  return (
    <Select onValueChange={handleBusinessChange} value={selectedBusinessId}>
      <SelectTrigger>
        <SelectValue placeholder="Select a business" />
      </SelectTrigger>
      <SelectContent>
        {businesses.map((business) => (
          <SelectItem key={business.id} value={business.id}>
            {business.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
