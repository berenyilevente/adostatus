"use server";

import { Response } from "@/types/action.types";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma/client";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";

export const getUsers = async (): Promise<Response<any[]>> => {
  const session = await useIsAuthenticated();

  const currentUserEmail = session?.user?.email;

  if (!currentUserEmail) {
    return {
      status: "error",
      data: undefined,
      code: 404,
      errors: "Current user not found",
    };
  }

  const users: any[] = await prisma.user.findMany({
    where: {
      email: {
        not: currentUserEmail,
      },
    },
  });

  return {
    status: "success",
    data: users,
    code: 200,
    errors: undefined,
  };
};

export const getUser = async (id: string): Promise<Response<any>> => {
  await useIsAuthenticated();

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
  await useIsAuthenticated();

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
