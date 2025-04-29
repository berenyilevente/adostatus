import { z } from "zod";

import { User } from "@/generated/prisma";

type CreateUserType = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "emailVerified"
>;

export const userSchema: z.ZodType<any> = z.object({
  email: z.string().email().min(1, { message: "Required!" }),
  name: z.string().min(1, { message: "Required!" }),
  image: z.string().nullable(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
