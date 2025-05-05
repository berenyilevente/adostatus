import { NODE_ENV } from "./env.config";

type Plan = {
  name: string;
  priceId: string;
  included: { name: string }[];
  excluded: { name: string }[];
  description: string;
  price: number;
  priceAnchor: number;
  isFeatured: boolean;
};

export type StripeConfig = {
  plans: Plan[];
  currency: string;
};

const pirceId: Record<string, Record<string, string>> = {
  basic: {
    development: "price_1RL87MPpJ1qNQtT58JGuEsfp",
    production: "price_456",
  },
  advanced: {
    development: "price_1RLGGDPpJ1qNQtT5g32E3m5h",
    production: "price_457",
  },
};

const basic: Plan = {
  name: "TimeGrid Starter",
  description:
    "Perfect for trying TimeGrid with a single business or service type.",
  priceId: pirceId.basic[NODE_ENV],
  included: [
    {
      name: "1 booking form",
    },
    {
      name: "Up to 20 bookings per month",
    },
    { name: "Basic email notifications" },
    { name: "Website embedding" },
  ],
  excluded: [
    { name: "Team access" },
    { name: "Calendar integrations" },
    { name: "Multiple forms" },
  ],
  price: 19,
  priceAnchor: 29,
  isFeatured: false,
};

const advanced: Plan = {
  name: "TimeGrid Business",
  description:
    "Everything you need for multiple businesses with a single subscription.",
  priceId: pirceId.advanced[NODE_ENV],
  included: [
    {
      name: "Unlimited appointment bookings",
    },
    {
      name: "Up to 5 custom booking forms",
    },
    {
      name: "Team access (up to 3 users)",
    },
    {
      name: "Advanced website embedding",
    },
    {
      name: "Email notifications & reminders",
    },
    {
      name: "Calendar integrations",
    },
  ],
  excluded: [],
  price: 49,
  priceAnchor: 69,
  isFeatured: true,
};

export const stripe: StripeConfig = {
  plans: [basic, advanced],
  currency: "€",
};
