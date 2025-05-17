import prisma from "@/lib/prisma/client";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { Response } from "@/types/action.types";

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
