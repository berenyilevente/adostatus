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
  name: "Basic",
  description: "Includes basic components to get you started",
  priceId: pirceId.basic[NODE_ENV],
  included: [
    {
      name: "TextInput, TextArea",
    },
    {
      name: "Dropdown",
    },
    { name: "Button, Icon" },
    { name: "Checkbox, Radio, Swap" },
  ],
  excluded: [
    {
      name: "Modal",
    },
    { name: "Table" },
    { name: "Tabs" },
    { name: "Drawer" },
  ],
  price: 49,
  priceAnchor: 79,
  isFeatured: false,
};

const advanced: Plan = {
  name: "Advanced",
  description: "Includes everything from the documentation",
  priceId: pirceId.advanced[NODE_ENV],
  included: [
    {
      name: "Everithing from the Documentation",
    },
    { name: "Modal, Table, Tabs, Drawer and many more, check out the docs" },
    { name: "lifetime updates" },
  ],
  excluded: [{ name: "Modal" }],
  price: 109,
  priceAnchor: 179,
  isFeatured: true,
};

export const stripe: StripeConfig = {
  plans: [basic, advanced],
};
