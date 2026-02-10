import { NODE_ENV } from './env.config';

export type Plan = {
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
    development: 'price_1SzBzILKEwIG6ZEAGRzVQIuu',
    production: 'price_1SzBzILKEwIG6ZEAGRzVQIuu',
  },
  advanced: {
    development: 'price_1SzBzILKEwIG6ZEAGRzVQIuu',
    production: 'price_1SzBzILKEwIG6ZEAGRzVQIuu',
  },
};

const basic: Plan = {
  name: 'Timegrid Starter',
  description:
    'Perfect for trying Timegrid with a single business or service type.',
  priceId: pirceId.basic[NODE_ENV],
  included: [
    {
      name: '1 booking form',
    },
    {
      name: 'Up to 20 bookings per month',
    },
    { name: 'Basic email notifications' },
    { name: 'Website embedding' },
  ],
  excluded: [
    { name: 'Team access' },
    { name: 'Calendar integrations' },
    { name: 'Multiple forms' },
  ],
  price: 19,
  priceAnchor: 29,
  isFeatured: false,
};

const advanced: Plan = {
  name: 'Timegrid Business',
  description:
    'Everything you need for multiple businesses with a single subscription.',
  priceId: pirceId.advanced[NODE_ENV],
  included: [
    {
      name: 'Unlimited appointment bookings',
    },
    {
      name: 'Up to 5 custom booking forms',
    },
    {
      name: 'Team access (up to 3 users)',
    },
    {
      name: 'Advanced website embedding',
    },
    {
      name: 'Email notifications & reminders',
    },
    {
      name: 'Calendar integrations',
    },
  ],
  excluded: [],
  price: 49,
  priceAnchor: 69,
  isFeatured: true,
};

export const stripe: StripeConfig = {
  plans: [basic, advanced],
  currency: '€',
};
