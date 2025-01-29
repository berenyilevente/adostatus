import { stripe } from "./stripe.config";
import { Config } from "../types/config.type";
import { resend } from "./resend.config";

export const config: Config = {
  app: {
    name: "SwiftBlocks",
    description: "The best fullstack nextjs template for your next project.",
    domain: "localhost:3000",
  },
  resend,
  db: {
    name: "swiftblocksdb",
  },
  stripe,
};
