"use server";

import Stripe from "stripe";

import {
  STRIPE_SECRET_KEY,
  STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL,
} from "@/config/env.config";
import { loadEnv } from "@/utils/load-env";

loadEnv();

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});

export async function createCheckoutSession({ priceId }: { priceId: string }) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${STRIPE_CANCEL_URL}`,
  });

  return session.url;
}
