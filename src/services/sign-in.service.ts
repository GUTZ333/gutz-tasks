import { typeSignInSchema } from "@/schemas/sign-in.schema";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export const handleSignInService = async ({ userEmail, userPassword }: typeSignInSchema, setError: UseFormSetError<typeSignInSchema>, reset: UseFormReset<typeSignInSchema>): Promise<void> => {
  const PASSWORD_INCORRECT = "this password is incorrect.";
  const EMAIL_NOT_EXIST = "this e-mail not exist.";

  const login = await signIn("credentials", {
    userEmail,
    userPassword,
    redirect: false,
    callbackUrl: "/"
  })

  if (login?.error) {
    console.error("Error during sign in:", login.error);
    switch (login.error) {
      case EMAIL_NOT_EXIST: {
        setError("userEmail", { message: EMAIL_NOT_EXIST, type: "manual" })
        break
      }
      case PASSWORD_INCORRECT: {
        setError("userPassword", { message: PASSWORD_INCORRECT, type: "manual" })
        break
      }
    }
  }
  else {
    toast.success("You are logged in!")
    reset();
    redirect(process.env.NEXTAUTH_URL as string)
  }
}