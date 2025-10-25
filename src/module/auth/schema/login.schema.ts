import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;