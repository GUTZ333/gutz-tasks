import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "./sign-in-form";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - Track Tasks",
}


export default function SignIn() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="mb-1">
                Sign In
              </CardTitle>
              <CardDescription>
                if you have an account, fill in your account credentials to authenticate yourself on it, otherwise create an account on the sign up page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}