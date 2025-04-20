"use server";

import { Response } from "@/types/action.types";

import prisma from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export const getUsers = async (): Promise<Response<any[]>> => {
  // const usersDemo = getUsersDemo();

  const users: any[] = await prisma.user.findMany();

  return {
    status: "success",
    data: users,
    code: 200,
    errors: undefined,
  };
};

export const getUser = async (id: string): Promise<Response<any>> => {
  // const user = await User.findById(id);

  // const user = getUserByIdDemo(id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

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

export const createUser = async (user: any): Promise<Response<any>> => {
  await prisma.user.create({
    data: user,
  });

  revalidatePath("/users");
  return {
    status: "success",
    data: user,
    code: 200,
    errors: undefined,
  };
};
