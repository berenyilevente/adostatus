'use client';

import { BreakTime, Business, BusinessHours } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  getBreakTimes,
  getBusinessHours,
  upsertBreakTimes,
  upsertBusinessHours,
} from './actions/business-hours.actions';
import {
  BreakTimesForm,
  BreakTimesSchema,
  BusinessHoursForm,
  BusinessHoursSchema,
} from './business-hours.helper';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';

type HookProp = {
  businesses: Business[];
};

const useHook = ({ businesses }: HookProp) => {
  const [isBusinessHoursDialogOpen, setIsBusinessHoursDialogOpen] =
    useState(false);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([]);
  const [breakTimes, setBreakTimes] = useState<BreakTime[]>([]);
  const [isLoading, startTransition] = useTransition();
  const { id: businessId } = useParams<{ readonly id: string }>();
  const router = useRouter();

  // TODO: use react query to fetch business hours and break times
  useEffect(() => {
    const fetchBusinessHours = async () => {
      const rBusinessHours = await getBusinessHours({ businessId });
      setBusinessHours(rBusinessHours.data ?? []);
    };

    const fetchBreakTimes = async () => {
      const rBreakTimes = await getBreakTimes({ businessId });
      setBreakTimes(rBreakTimes.data ?? []);
    };

    fetchBusinessHours();
    fetchBreakTimes();
  }, []);

  const business = businesses.find((business) => business.id === businessId);
  const businessName = business?.name;

  const businessHoursForm = useForm<BusinessHoursForm>({
    resolver: zodResolver(BusinessHoursSchema),
    defaultValues: {
      businessId: businessId,
      dayOfWeek: [],
      openTime: '',
      closeTime: '',
    },
  });

  const breakTimesForm = useForm<BreakTimesForm>({
    resolver: zodResolver(BreakTimesSchema),
    defaultValues: {
      businessId: businessId,
      dayOfWeek: [],
      startTime: '',
      endTime: '',
    },
  });

  const onSubmitBusinessHours = businessHoursForm.handleSubmit(async (data) => {
    startTransition(async () => {
      const res = await upsertBusinessHours(businessId, data);
      if (res.status === 'success') {
        router.refresh();
        closeBusinessHoursDialog();
        toast.success('Business hours updated');
        setBusinessHours(res.data ?? []);
        return;
      }
      if (res.status === 'error') {
        toast.error(res.error);
        return;
      }
    });
  });

  const onSubmitBreakTimes = breakTimesForm.handleSubmit(async (data) => {
    startTransition(async () => {
      const res = await upsertBreakTimes(businessId, data);
      if (res.status === 'success') {
        router.refresh();
        closeBusinessHoursDialog();
        toast.success('Break times updated');
        setBreakTimes(res.data ?? []);
        return;
      }
      if (res.status === 'error') {
        toast.error(res.error);
        return;
      }
    });
  });

  const openBusinessHoursDialog = () => {
    setIsBusinessHoursDialogOpen(true);
  };

  const closeBusinessHoursDialog = () => {
    businessHoursForm.reset();
    breakTimesForm.reset();
    setIsBusinessHoursDialogOpen(false);
  };

  return {
    businessHours,
    breakTimes,
    businesses,
    businessName,
    businessHoursForm,
    breakTimesForm,
    isBusinessHoursDialogOpen,
    openBusinessHoursDialog,
    onSubmitBusinessHours,
    onSubmitBreakTimes,
    closeBusinessHoursDialog,
    setIsBusinessHoursDialogOpen,
    isLoading,
  };
};

const [useBusinessHours, BusinessHoursProvider] = createAppContext(useHook);

export { useBusinessHours, BusinessHoursProvider };
