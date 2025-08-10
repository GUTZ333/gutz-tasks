"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormSignUp } from "@/hooks/auth/use-form-sign-up";
import { handleSignUpService } from "@/services/sign-up.service";
import clsx from "clsx";
import { Toaster } from "sonner";

export default function SignUpForm() {
  const { register, formState: { errors, isSubmitting }, handleSubmit, setError, reset } = useFormSignUp();

  return (
    <form onSubmit={handleSubmit(async(data) => {
      await handleSignUpService(data, setError, reset)
    })} noValidate>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <div className="flex flex-col gap-0 5">
            <Input
              {...register("userName")}
              id="username"
              type="text"
              placeholder="type your user..."
              required
              className={clsx(errors.userName ? "border border-red-600" : "")}
            />
            {errors.userName && <p className="text-red-600 font-semibold">{errors.userName.message}</p>}
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="userEmail">E-mail</Label>
          <div className="flex flex-col gap-0 5">
            <Input
              {...register("userEmail")}
              id="userEmail"
              type="email"
              placeholder="type your e-mail..."
              required
              className={clsx(errors.userEmail ? "border border-red-600" : "")}
            />
            {errors.userEmail && <p className="text-red-600 font-semibold">{errors.userEmail.message}</p>}
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="userPassword">Password</Label>
          <div className="flex flex-col gap-0 5">
            <Input
              {...register("userPassword")}
              id="userPassword"
              type="password"
              placeholder="type your password..."
              required
              className={clsx(errors.userPassword ? "border border-red-600" : "")}
            />
            {errors.userPassword && <p className="text-red-500 font-semibold">{errors.userPassword?.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "...Registering" : "Sign Up"}
          </Button>
        </div>
        <Toaster position="top-center"/>
      </div>
      <div className="text-center text-sm">
        You have an account?{" "}
        <Link href="/auth/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </form>
  )
}