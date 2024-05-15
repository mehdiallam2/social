import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .min(2, "Must be greater than 2 carachters")
    .max(20, "Must be less than 20 carachters")
    .regex(
      RegExp(/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
      "Please enter a valid username"
    ),
  password: z.string().min(7, "Password must be at least 7 characters"),
  rememberMe: z.boolean().default(false).optional(),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
