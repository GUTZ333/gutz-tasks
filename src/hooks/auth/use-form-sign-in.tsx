import { signInSchema, typeSignInSchema } from "@/schemas/sign-in.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

export function useFormSignIn() {
  return useForm<typeSignInSchema>({
    resolver: zodResolver(signInSchema)
  })
}