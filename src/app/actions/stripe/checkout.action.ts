"use server";

import Stripe from "stripe";

import {
  STRIPE_SECRET_KEY,
  STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL,
} from "@/config/env.config";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});

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
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: STRIPE_SUCCESS_URL,
    cancel_url: STRIPE_CANCEL_URL,
    customer: customer?.id,
  });

  return session.url;
}
