import { stripe } from "./stripe.config";
import { Config } from "../types/config.type";
import { resend } from "./resend.config";
import { BASE_URL } from "./env.config";

export const config: Config = {
  app: {
    name: "SwiftBlocks",
    description: "The best fullstack nextjs template for your next project.",
    domain: BASE_URL,
  },
  resend,
  db: {
    name: "swiftblocksdb",
  },
  stripe,
};
