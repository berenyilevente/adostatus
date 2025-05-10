import Stripe from "stripe";

import { getCheckoutSession } from "@/lib/stripe/getCheckoutSession";
import {
  Plan as StripePlan,
  stripe as stripeConfig,
} from "@/config/stripe.config";

export type CheckoutSession = {
  customerId: string;
  subscriptionId: string;
  priceId: string;
  email: string;
  plan: StripePlan["name"];
};

export const getCheckoutSessionData = async (
  stripeObject: Stripe.Checkout.Session
): Promise<CheckoutSession> => {
  const session = await getCheckoutSession(stripeObject.id);

  if (!session) {
    throw new Error("Stripe session not found");
  }

  const customerId = session.customer?.toString();
  const subscriptionId = session.subscription?.toString();
  const priceId = session.line_items?.data[0]?.price?.id;
  const plan = stripeConfig.plans.find((p) => p.priceId === priceId);
  const email = session.customer_details?.email;

  if (!plan) {
    throw new Error("Plan not found");
  }

  if (!subscriptionId) {
    throw new Error("Subscription ID not found");
  }

  if (!priceId) {
    throw new Error("Price ID not found");
  }

  if (!customerId) {
    throw new Error("Customer ID not found");
  }

  if (!email) {
    throw new Error("Customer email is not set");
  }

  return {
    customerId,
    subscriptionId,
    priceId,
    email,
    plan: plan.name,
  };
};
