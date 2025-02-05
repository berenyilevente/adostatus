"use server";

import connectMongo from "@/database/mongoose";
import { Response } from "@/types/action.types";

import { User, IUser } from "../models/user.model";
import { getUserByIdDemo, getUsersDemo } from "@/database/demo/demo-data";

export const getUsers = async (): Promise<Response<IUser[]>> => {
  await connectMongo();
  // const users = await User.find();
  const usersDemo = getUsersDemo();

  return {
    status: "success",
    data: usersDemo,
    code: 200,
    errors: undefined,
  };
};

export const getUser = async (id: string): Promise<Response<IUser>> => {
  await connectMongo();
  // const user = await User.findById(id);

  const user = getUserByIdDemo(id);

  console.log(user);

  if (!user) {
    return {
      status: "error",
      data: undefined,
      code: 404,
      errors: "User not found",
    };
  }

  return {
    status: "success",
    data: user,
    code: 200,
    errors: undefined,
  };
};
