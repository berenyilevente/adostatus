'use client';

import { Appointment, Business, Service, TeamMember } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getAppointments, createAppointment } from './actions/calendar.actions';
import { AppointmentSchema, CreateAppointment } from './calendar.helper';
import { getServices } from '../business/actions/business.actions';
import { getTeamMembers } from '../team-members/actions/teamMember.actions';
import { TeamMemberWithUser } from '../team-members/teamMember.helper';

type HookProp = {
  businesses: Business[];
};

const useHook = ({ businesses }: HookProp) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithUser[]>([]);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);

  const filterForm = useForm({
    defaultValues: {
      business: '',
    },
  });

  const businessId = filterForm.watch('business');

  const appointmentForm = useForm<CreateAppointment>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      businessId: '',
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

  const serviceOptions = services.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const teamMemberOptions = teamMembers.map((teamMember) => ({
    // TODO: Handle case where user is null
    label: teamMember.user.name ?? '',
    value: teamMember.id,
  }));

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  const onAppointmentSubmit = appointmentForm.handleSubmit(async (data) => {
    await createAppointment({ ...data, businessId });
  });

  useEffect(() => {
    if (!businessId) {
      return;
    }

    const fetchAppointments = async () => {
      const rAppointments = await getAppointments([businessId]);
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
    teamMemberOptions,
    serviceOptions,
    statusOptions,
  };
};

const [useCalendar, CalendarProvider] = createAppContext(useHook);

export { useCalendar, CalendarProvider };
