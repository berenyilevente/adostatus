import { stripe } from '@/lib/stripe/stripe.lib';

/*
 * @returns The checkout session with the planId the user subscribed to
 */
export const getCheckoutSession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
