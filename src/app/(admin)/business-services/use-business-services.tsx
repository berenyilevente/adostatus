'use client';

import { Business, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createService,
  updateService,
} from './actions/business-services.actions';
import { ServicesForm, ServicesSchema } from './business-services.helper';
import { useRouter } from 'next/navigation';

type HookProp = {
  business: Business;
  services: Service[];
};

const useHook = ({ business, services }: HookProp) => {
  const router = useRouter();
  const [isCreateServicesDialogOpen, setIsCreateServicesDialogOpen] =
    useState(false);
  const [isEditServicesDialogOpen, setIsEditServicesDialogOpen] =
    useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filterForm = useForm({
    defaultValues: { business: business.id },
  });

  const businessName = business?.name;

  const defaultValues = {
    businessId: business.id,
    name: '',
    price: '',
    currency: '',
    isActive: false,
    duration: '',
    bufferTime: '',
    description: '',
    color: null,
    formId: null,
  };

  const servicesForm = useForm<ServicesForm>({
    resolver: zodResolver(ServicesSchema),
    defaultValues,
  });

  const onSubmitEditService = servicesForm.handleSubmit(async (data) => {
    if (!selectedService) {
      return;
    }

    await updateService(selectedService.id, data);

    router.refresh();
    handleClose();
  });

  const handleCreateService = () => {
    servicesForm.reset(defaultValues);
    setSelectedService(null);
    setIsCreateServicesDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    servicesForm.reset(service);
    setSelectedService(service);
    setIsEditServicesDialogOpen(true);
  };

  const onSubmitService = servicesForm.handleSubmit(async (data) => {
    await createService(data);
    handleClose();
  });

  const handleClose = () => {
    servicesForm.reset();
    setIsCreateServicesDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setSelectedService(null);
  };

  return {
    business,
    filterForm,
    businessName,
    servicesForm,
    isCreateServicesDialogOpen,
    services,
    selectedService,
    isEditServicesDialogOpen,
    setIsEditServicesDialogOpen,
    onSubmitService,
    handleEditService,
    handleClose,
    setIsCreateServicesDialogOpen,
    onSubmitEditService,
    handleCreateService,
  };
};

const [useBusinessServices, BusinessServicesProvider] =
  createAppContext(useHook);

export { useBusinessServices, BusinessServicesProvider };
