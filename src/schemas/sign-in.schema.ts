import { z } from "zod";

export const signInSchema = z.object({
  userEmail: z.string({
    message: "This input must be a string."
  }).nonempty({
    message: "This input can not be empty."
  }).email({
    message: "This email is invalid"
  }),
  userPassword: z.string({ message: "this input must be a string" })
    .min(6, {
      message: "this password needs at least 6 characters"
    }).max(40, {
      message: "this password cannot exceed 40 characters"
    }).nonempty({
      message: "this input cannot be empty."
    })
});

export type typeSignInSchema = z.infer<typeof signInSchema>