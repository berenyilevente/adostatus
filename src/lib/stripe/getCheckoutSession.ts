import { STRIPE_SECRET_KEY } from "@/config/env.config";
import Stripe from "stripe";

/*
 * @returns The checkout session with the planId the user subscribed to
 */
export const getCheckoutSession = async (sessionId: string) => {
  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2025-04-30.basil",
      typescript: true,
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
