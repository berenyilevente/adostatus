'use client';

import { Appointment, Business } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAppointments } from './actions/calendar.actions';

type HookProp = {
  businesses: Business[];
};

const useHook = ({ businesses }: HookProp) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const filterForm = useForm({
    defaultValues: {
      business: businesses[0].id,
    },
  });

  const businessOptions = businesses.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  const businessId = filterForm.watch('business');

  useEffect(() => {
    if (!businessId) {
      return;
    }

    const fetchAppointments = async () => {
      const rAppointments = await getAppointments(businessId);
      if (rAppointments.status === 'success' && rAppointments.data) {
        setAppointments(rAppointments.data);
      }
    };

    fetchAppointments();
  }, [businessId]);

  return {
    businesses,
    businessOptions,
    filterForm,
    appointments,
  };
};

const [useCalendar, CalendarProvider] = createAppContext(useHook);

export { useCalendar, CalendarProvider };
