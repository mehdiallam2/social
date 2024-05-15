import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "Too small")
    .max(14, "Too long")
    .regex(
      RegExp(/^(?=.{2,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
      "Please enter a valid name"
    ),
  lastName: z
    .string()
    .min(2, "Too small")
    .max(14, "Too long")
    .regex(
      RegExp(/^(?=.{2,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
      "Please enter a valid name"
    ),
  username: z
    .string()
    .min(2, "Too small")
    .max(20, "Too long")
    .regex(
      RegExp(/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
      "Please enter a valid username"
    ),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 letters"),
  privacyPolicy: z.boolean().optional(),
});

export type TSignupSchema = z.infer<typeof signUpSchema>;
