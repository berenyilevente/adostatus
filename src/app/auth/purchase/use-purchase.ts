'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { routes } from '@/lib/routes';
import { stripe } from '@/config/stripe.config';
import { createCheckoutSession } from '@/app/actions/stripe/checkout.action';

export const usePurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const priceId = searchParams.get('priceId');
  console.log('use-purchase.ts at Line: 20', priceId);

  const purchaseSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    priceId: z.string(),
  });

  type PurchaseSchema = z.infer<typeof purchaseSchema>;

  const form = useForm<PurchaseSchema>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      email: '',
      priceId: stripe.plans[0].priceId,
    },
  });

  const { handleSubmit, setError } = form;

  const setErrors = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const onSubmit = handleSubmit(async ({ email }: PurchaseSchema) => {
    setIsLoading(true);

    try {
      if (!priceId) {
        setErrors({ priceId: 'Plan not found!' });
        return;
      }

      const url = await createCheckoutSession({ priceId, email });
      await signIn('email', { email, callbackUrl: routes.dashboard.index });

      if (url) {
        window.location.href = url;
      }
      setIsLoading(false);
    } catch (e: any) {
      setErrors({ email: e.message });
      setIsLoading(false);
    }
  });

  return {
    isLoading,
    form,
    onSubmit,
  };
};
