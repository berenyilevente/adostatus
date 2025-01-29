import { StripeConfig } from "@/config/stripe.config";

export type Config = {
  app: {
    name: string;
    description: string;
    domain: string;
  };
  resend: {
    fromNoReply: string;
    fromAdmin: string;
    supportEmail: string;
    forwardRepliesTo: string;
  };
  db: {
    name: string;
  };
  stripe: StripeConfig;
};
