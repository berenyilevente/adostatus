import { stripe } from "./stripe.config";
import { Config } from "../types/config.type";
import { resend } from "./resend.config";
import { BASE_URL } from "./env.config";

export const config: Config = {
  app: {
    name: "TimeGrid",
    description: "The best scheduling platform for your business.",
    domain: BASE_URL,
  },
  resend,
  db: {
    name: "swiftblocksdb",
  },
  stripe,
};
