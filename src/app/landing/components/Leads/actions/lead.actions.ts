"use server";

import connectMongo from "@/lib/mongo/mongoose";
import { Response } from "@/types/action.types";

import { Lead } from "../models/lead.model";
import { ILead } from "../types/lead.types";
import { config } from "@/config";
import { resend } from "@/lib/email/resend";
import { WelcomeEmail } from "@/components/email/welcome.email";
import { NewLeadEmail } from "@/components/email/new-lead.email";

export const saveLead = async (email: string): Promise<Response<ILead>> => {
  await connectMongo();

  if (!email) {
    return {
      status: "error",
      errors: "Email is required",
      code: 400,
      data: undefined,
    };
  }

  const existingLead = await Lead.findOne({ email });

  if (existingLead) {
    return {
      status: "error",
      errors: "Email already exists",
      code: 409,
      data: undefined,
    };
  }

  const data = await Lead.create({ email });

  if (data) {
    await resend.emails.send({
      from: config.resend.fromNoReply,
      to: [email],
      subject: "Welcome to SwiftBlocks!",
      text: "We will be in touch soon",
      react: WelcomeEmail(),
    });

    await resend.emails.send({
      from: config.resend.fromNoReply,
      to: [config.resend.forwardRepliesTo],
      subject: "New lead has joined the SwiftBlocks waitlist!",
      react: NewLeadEmail({ email }),
    });
    return {
      status: "success",
      data,
      code: 200,
      errors: undefined,
    };
  }

  return {
    status: "error",
    errors: "Something went wrong",
    code: 500,
    data: undefined,
  };
};
