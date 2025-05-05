import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "@/config/env.config";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});
const webhookSecret = STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;

  try {
    if (!webhookSecret) {
      throw new Error("Stripe webhook secret is not set");
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Subscription success:", session);
    // TODO: Save subscription in DB, activate account, etc.
  }

  return new Response("ok", { status: 200 });
}
