import { z } from "zod";

const baseUserSchemaObject = {
  email: z.string().email().min(1, { message: "Required!" }),
  mobileNumber: z.string().trim().min(1, { message: "Required!" }),
  image: z.string().optional() ?? null,
};

export const editUserSchema = z.object(baseUserSchemaObject);
export const createUserSchema = z.object(baseUserSchemaObject);

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
