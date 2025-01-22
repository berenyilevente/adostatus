import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import EmailProvider from "next-auth/providers/email";

import client from "@/database/client";
import { config, EMAIL_SERVER } from "@/config";
import { sendVerificationRequest } from "./verification";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  providers: [
    EmailProvider({
      server: EMAIL_SERVER,
      from: config.resend.fromNoReply,
      sendVerificationRequest({ identifier: email, url }) {
        sendVerificationRequest({
          identifier: email,
          url,
        });
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {},
};
