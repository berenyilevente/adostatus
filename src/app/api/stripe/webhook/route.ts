import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { getOrCreateUser, createSubscription } from './queries';
import { getCheckoutSessionData } from '@/lib/stripe/getCheckoutSessionData';
import { stripe } from '@/lib/stripe/stripe.lib';

const webhookSecret =
  process.env.STRIPE_WEBHOOK_SECRET ?? 'stripe_webhook_secret';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event;

  try {
    if (!webhookSecret) {
      throw new Error('Stripe webhook secret is not set');
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const stripeObject: Stripe.Checkout.Session = event.data.object;
    const checkoutSession = await getCheckoutSessionData(stripeObject);

    const user = await getOrCreateUser(checkoutSession.email);

    await createSubscription(user, checkoutSession);
  }

  return new Response('ok', { status: 200 });
}
