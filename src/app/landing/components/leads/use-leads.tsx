'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { leadsSchema, LeadsSchemaType } from './schemas/lead.schemas';
import { useState } from 'react';

export const useLeads = () => {
  const form = useForm<LeadsSchemaType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(leadsSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (_data: LeadsSchemaType) => {
    setSubmitted(true);
  });

  return { form, onSubmit, isValid, submitted };
};
