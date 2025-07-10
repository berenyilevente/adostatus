'use client';

import { Appointment, Business, Service, TeamMember } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAppointments, createAppointment } from './actions/calendar.actions';
import { CreateAppointment } from './calendar.helper';
import { getServices } from '../business/actions/business.actions';
import { getTeamMembers } from '../team-members/actions/teamMember.actions';

type HookProp = {
  businesses: Business[];
};

const useHook = ({ businesses }: HookProp) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);

  const filterForm = useForm({
    defaultValues: {
      business: businesses[0].id,
    },
  });

  const appointmentForm = useForm<CreateAppointment>({
    defaultValues: {
      businessId: businesses[0].id,
      serviceId: '',
      teamMemberId: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      title: '',
      description: '',
      status: 'pending',
      notes: '',
      formData: null,
    },
  });

  const businessOptions = businesses.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  const businessId = filterForm.watch('business');

  const onAppointmentSubmit = appointmentForm.handleSubmit(async (data) => {
    await createAppointment(data);
  });

  useEffect(() => {
    if (!businessId) {
      return;
    }

    const fetchAppointments = async () => {
      const rAppointments = await getAppointments(businessId);
      setAppointments(rAppointments.data || []);
    };

    const fetchServices = async () => {
      const rServices = await getServices(businessId);
      setServices(rServices.data || []);
    };

    const fetchTeamMembers = async () => {
      const rTeamMembers = await getTeamMembers([businessId]);
      setTeamMembers(rTeamMembers.data || []);
    };

    fetchAppointments();
    fetchServices();
    fetchTeamMembers();
  }, [businessId]);

  return {
    businesses,
    businessOptions,
    filterForm,
    appointments,
    appointmentForm,
    isAppointmentDialogOpen,
    setIsAppointmentDialogOpen,
    onAppointmentSubmit,
  };
};

const [useCalendar, CalendarProvider] = createAppContext(useHook);

export { useCalendar, CalendarProvider };
