'use client';

import { Business, Service } from '@/generated/prisma';

import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createService } from './actions/business-services.actions';
import { ServicesForm, ServicesSchema } from './business-services.helper';
import { useRouter } from 'next/navigation';

type HookProp = {
  business: Business;
  services: Service[];
};

const useHook = ({ business, services }: HookProp) => {
  const router = useRouter();
  const [isServicesDialogOpen, setIsServicesDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filterForm = useForm({
    defaultValues: { business: business.id },
  });

  const businessName = business?.name;

  const servicesForm = useForm<ServicesForm>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: {
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
    },
  });

  const onSubmitEditService = (service: Service) => {
    setSelectedService(service);

    // await updateService(service.id, data);
    router.refresh();
  };

  const onSubmitService = servicesForm.handleSubmit(async (data) => {
    await createService(data);
  });

  const handleClose = () => {
    servicesForm.reset();
    setIsServicesDialogOpen(false);
  };

  return {
    business,
    filterForm,
    businessName,
    servicesForm,
    isServicesDialogOpen,
    services,
    onSubmitService,
    handleClose,
    setIsServicesDialogOpen,
  };
};

const [useBusinessServices, BusinessServicesProvider] =
  createAppContext(useHook);

export { useBusinessServices, BusinessServicesProvider };
