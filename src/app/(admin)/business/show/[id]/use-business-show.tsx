'use client';

import { useParams, useRouter } from 'next/navigation';

import { createAppContext } from '@/hooks/use-create-app-context';
import dayjs from 'dayjs';

import { Service } from '@/generated/prisma';
import {
  BusinessResponse,
  createService,
} from '../../actions/business.actions';
import {
  businessTypes,
  ServicesForm,
  ServicesSchema,
} from '../../business.helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

type HookProp = {
  business: BusinessResponse;
};

const useHook = ({ business }: HookProp) => {
  const router = useRouter();
  const { id: businessId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    router.back();
  };

  const getBusinessTypeLabel = (type: string | null) => {
    if (!type) {
      return 'Not specified';
    }
    const found = businessTypes.find((t) => t.value === type);

    return found ? found.label : type;
  };

  const formatTime = (time: string) => {
    return dayjs(new Date(`2000-01-01T${time}`)).format('h:mm a');
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

  const formatDuration = (minutes: string | null) => {
    if (!minutes) return 'Not specified';
    const mins = parseInt(minutes);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return {
    business,
    isLoading,
    handleCancel,
    getBusinessTypeLabel,
    formatTime,
    getDayLabel,
    formatDuration,
  };
};

const [useBusinessShow, BusinessShowProvider] = createAppContext(useHook);
export { useBusinessShow, BusinessShowProvider };
