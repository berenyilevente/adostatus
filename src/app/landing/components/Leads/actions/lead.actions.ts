"use server";

import connectMongo from "@/lib/mongo/mongoose";
import { Response } from "@/types/action.types";

import { Lead } from "../models/lead.model";
import { ILead } from "../types/lead.types";

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

  let data;

  try {
    data = await Lead.create({ email });
  } catch (error) {
    console.log(error);
  }

  if (data)
    return {
      status: "success",
      data,
      code: 200,
      errors: undefined,
    };

  return {
    status: "error",
    errors: "Something went wrong",
    code: 500,
    data: undefined,
  };
};
