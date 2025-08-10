"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormSignIn } from "@/hooks/auth/use-form-sign-in";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { handleSignInService } from "@/services/sign-in.service";
import clsx from "clsx";
import { Toaster } from "sonner";

export default function SignInForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useFormSignIn();

  return (
    <form onSubmit={handleSubmit(async(data) => {
      await handleSignInService(data, setError, reset)
    })} noValidate>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="userEmail">E-mail</Label>
          <div className="flex flex-col gap-0.5">
            <Input {...register("userEmail")} id="userEmail" placeholder="type your e-mail..." type="email" className={clsx(errors.userEmail ? "border border-red-600" : "")} />
            {errors.userEmail && <p className="text-red-600 font-semibold ml-0.5">{
              errors.userEmail.message}</p>}
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="userPassword">Password</Label>
          <div className="flex flex-col gap-0.5">
            <Input {...register("userPassword")} id="userPassword" placeholder="type your password..." type="password" className={clsx(errors.userPassword ? "border border-red-600" : "")} />
            {errors.userPassword && <p className="text-red-600 font-semibold ml-0.5">{
              errors.userPassword.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "logging..." : "Sign In"}
        </Button>
      </div>
      <Toaster position="top-center"/>

      <div className="text-center text-sm mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}