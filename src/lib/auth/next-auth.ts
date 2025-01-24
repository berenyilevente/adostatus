import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import client from "@/database/client";

import { emailProvider } from "./auth-providers";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  providers: [emailProvider],

  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {},
};
