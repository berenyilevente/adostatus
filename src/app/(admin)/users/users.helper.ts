import { z } from "zod";

const baseUserSchemaObject = {
  firstName: z.string().max(50).trim(),
  lastName: z.string().max(50).trim(),
  email: z.string().email().min(1, { message: "Required!" }),
  mobileNumber: z.string().trim().min(1, { message: "Required!" }),
  status: z.string().min(1, { message: "Required!" }),
  image: z.string().optional(),
};

export const inviteUserSchemaObject = z.object({
  firstName: z.string().max(50).trim(),
  lastName: z.string().max(50).trim(),
  role: z.string().max(50).trim().min(1, { message: "Required!" }),
  email: z.string().email(),
});

export const changeUserPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createUserSchema = z
  .object({
    ...baseUserSchemaObject,
    password: z.string().trim().min(1, { message: "Required!" }),
    confirmPassword: z.string().trim().min(1, { message: "Required!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const editUserSchema = z.object(baseUserSchemaObject);

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export type ChangeUserPasswordSchemaType = z.infer<
  typeof changeUserPasswordSchema
>;
export type InviteUserSchemaType = z.infer<typeof inviteUserSchemaObject>;
