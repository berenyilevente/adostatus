import { config } from "./main.config";

export const resend = {
  fromNoReply: `${config.app.domain} <noreply@swiftblocks.net>`,
  fromAdmin: `${config.app.domain} - Admin <admin@swiftblocks.net}>`,
  supportEmail: `support@swiftblocks.net`,
  forwardRepliesTo: "berenyi.lev@gmail.com",
};
