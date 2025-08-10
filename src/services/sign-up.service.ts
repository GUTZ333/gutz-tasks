import { typeSignUpSchema } from "@/schemas/sign-up.schema";
import "dotenv/config";
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export const handleSignUpService = async ({ userEmail, userName, userPassword }: typeSignUpSchema, setError: UseFormSetError<typeSignUpSchema>, reset: UseFormReset<typeSignUpSchema>): Promise<void> => {
  try {
    console.log("url backend sign-up: ", `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/sign-up`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userEmail, userName, userPassword
      })
    })
    if (!response.ok) {
      const data = await response.json();
      console.error("Error during sign up:", data);
      if (data.userEmail)
        setError("userEmail", { message: data.userEmail, type: "manual" })
      if (data.userName)
        setError("userName", { message: data.userName, type: "manual" })
      return
    }

    const login = await signIn("credentials", {
      userEmail, userPassword, redirect: true, callbackUrl: "/"
    })
    if (!login?.ok) console.error("Error during sign in after sign up:", login?.error);

    else {
      toast.success("You are registred!!")
      reset();
      redirect(process.env.NEXTAUTH_URL as string);
    }
  }
  catch (err) {
    if (err instanceof Error) console.log(err);
  }
}