import { NextAuthOptions } from "next-auth";
import client from "@/lib/prisma/client";

import { emailProvider } from "./auth-providers";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
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
