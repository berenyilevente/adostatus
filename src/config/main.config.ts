import { stripe } from "./stripe.config";
import { Config } from "../types/config.type";

export const config: Config = {
  app: {
    name: "SwiftBlocks",
    description: "The best saas template for your next project.",
    domain: "localhost:3000",
  },
  resend: {
    fromNoReply: `SwiftBlocks <noreply@swiftblocks.net>`,
    fromAdmin: `SwiftBlocks - Admin <admin@swiftblocks.net>`,
    supportEmail: "support@swiftblocks.net",
    forwardRepliesTo: "berenyi.lev@gmail.com",
  },
  db: {
    name: "swiftblocksdb",
  },
  stripe,
};
