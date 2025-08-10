import { signUpSchema, typeSignUpSchema } from "@/schemas/sign-up.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function useFormSignUp() {
  return useForm<typeSignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })
}