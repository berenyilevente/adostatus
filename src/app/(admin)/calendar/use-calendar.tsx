'use client';

import { Appointment, Business, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getServices } from '../business-services/actions/business-services.actions';
import { getTeamMembers } from '../team-members/actions/teamMember.actions';
import { TeamMemberWithUser } from '../team-members/teamMember.helper';
import { createAppointment, getAppointments } from './actions/calendar.actions';
import {
  AppointmentFormSchema,
  CreateAppointmentForm,
} from './calendar.helper';
import { useQueryState } from 'nuqs';

type HookProp = {
  businesses: Business[];
};

const useHook = ({ businesses }: HookProp) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithUser[]>([]);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);

  const [businessIdUrl] = useQueryState('businessId');

  useEffect(() => {
    if (!businessIdUrl) {
      return;
    }

    const fetchTeamMembers = async () => {
      const rTeamMembers = await getTeamMembers([businessIdUrl]);
      setTeamMembers(rTeamMembers.data || []);
    };

    fetchTeamMembers();
  }, [businessIdUrl]);

  const filterForm = useForm({
    defaultValues: {
      business: businesses?.[0]?.id,
    },
  });

  const businessId = filterForm.watch('business');
  const business = businesses.find((business) => business.id === businessId);
  const businessName = business?.name;

  const appointmentForm = useForm<CreateAppointmentForm>({
    resolver: zodResolver(AppointmentFormSchema),
    defaultValues: {
      businessId: '',
      serviceId: '',
      teamMemberId: '',
      title: '',
      description: '',
      status: 'PENDING',
      backgroundColor: '#000000',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    },
  });

  const businessOptions = businesses?.map((business) => ({
    label: business.name,
    value: business.id,
  }));

  const serviceOptions = services?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const teamMemberOptions = teamMembers?.map((teamMember) => ({
    label: teamMember.user.name ?? '',
    value: teamMember.id,
  }));

  const statusOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Cancelled', value: 'CANCELLED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'No Show', value: 'NO_SHOW' },
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
    businessName,
  };
};

const [useCalendar, CalendarProvider] = createAppContext(useHook);

export { CalendarProvider, useCalendar };
