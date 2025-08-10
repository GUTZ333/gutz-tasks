import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex gap-1 justify-center items-center">
          <Clipboard width={40} />
          <span className="text-lg font-bold">Track Tasks</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/auth/sign-in">
          <Button variant="ghost" className="cursor-pointer">
            Sign in
          </Button>
        </Link>
        <Link href="/auth/sign-up" className="hidden md:block">
          <Button variant="secondary" className="cursor-pointer">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}