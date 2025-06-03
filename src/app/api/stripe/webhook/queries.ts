import dayjs from "dayjs";

import prisma from "@/lib/prisma/client";
import { User } from "@/generated/prisma";
import { CheckoutSession } from "@/lib/stripe/getCheckoutSessionData";

export const getOrCreateUser = async (email: string) => {
  let user: User | null;

  user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email, isActive: false },
    });
  }

  return user;
};

export const createSubscription = async (
  user: User,
  checkoutSession: CheckoutSession
) => {
  if (!user) {
    throw new Error("User not found, cannot create subscription");
  }

  const { customerId, subscriptionId, priceId, plan } = checkoutSession;

  await prisma.subscription.create({
    data: {
      userId: user.id,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      stripePriceId: priceId,
      planName: plan,
      status: "active",
      currentPeriodStart: dayjs().toISOString(),
      currentPeriodEnd: dayjs().add(1, "year").toISOString(),
      cancelAtPeriodEnd: false,
    },
  });
};
