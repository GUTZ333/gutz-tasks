import { z } from "zod";

export const signUpSchema = z.object({
  userName: z.string({ message: "this input must be a string." }).nonempty({ message: "this input cannot be empty." }).min(6, { message: "this userName needs at least 6 characters." }).max(40, {
    message: "this username cannot exceed 40 characters."
  }),
  userEmail: z.string({message: "this input must be a string."}).nonempty({message: "this input cannot be empty."}).email({message: "this email is invalid."}),
  userPassword: z.string({message: "this input must be a string."}).nonempty({message: "this input cannot be empty."}).min(6, {message: "this password needs ate least 6 characters."}).max(40, {message: "this password cannot exceed 40 characters."})
})  

export type typeSignUpSchema = z.infer<typeof signUpSchema>