import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./sign-up-form";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - Track Tasks",
}

export default function SignUp() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Sign Up
              </CardTitle>
              <CardDescription className="mt-2">
                if you do not have an account yet, fill in the following credentials and click on sign up, if you already have, log in to the sign in page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}