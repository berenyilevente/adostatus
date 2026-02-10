'use server';

import { stripe } from '@/lib/stripe/stripe.lib';

export async function createCheckoutSession({
  priceId,
  email,
}: {
  priceId: string;
  email?: string;
}) {
  let customer;

  if (email) {
    const customers = await stripe.customers.list({ email });

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({ email });
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    customer: customer?.id,
  });

  return session.url;
}
