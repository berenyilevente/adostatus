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
};

const pirceId: Record<string, Record<string, string>> = {
  basic: {
    development: "price_1PVfBeGadLSSnbBWcBsTWbIs",
    production: "price_456",
  },
  advanced: {
    development: "price_1PVpFqGadLSSnbBWWE3KB09S",
    production: "price_457",
  },
};

const basic: Plan = {
  name: "SwiftBlocks Essentials",
  description:
    "Perfect for solo developers and freelancers who want to launch faster without breaking the bank.",
  priceId: pirceId.basic[NODE_ENV],
  included: [
    {
      name: "Pre-configured components: Tailwind, shadcn/ui, React, and Next.js.",
    },
    {
      name: "Core integrations: User auth, emails, and backend setup.",
    },
    { name: "Basic modules: User management, task management, and more" },
    { name: "Clear development guidelines: Speed and consistency, built-in." },
  ],
  excluded: [],
  price: 179,
  priceAnchor: 299,
  isFeatured: false,
};

const advanced: Plan = {
  name: " SwiftBlocks Pro",
  description:
    "For developers who want everything Essentials offers - plus advanced features to scale faster.",
  priceId: pirceId.advanced[NODE_ENV],
  included: [
    {
      name: "Everything from Essentials",
    },
    {
      name: "Advanced integrations: Stripe payments, calendar modules, and more.",
    },
    {
      name: "Premium modules: Advanced user dashboards, analytics, and reporting.",
    },
    {
      name: "Priority support: Get your questions answered faster.",
    },
    {
      name: "Exclusive templates: Additional landing page and UI templates.",
    },
  ],
  excluded: [],
  price: 210,
  priceAnchor: 349,
  isFeatured: true,
};

export const stripe: StripeConfig = {
  plans: [basic, advanced],
};
